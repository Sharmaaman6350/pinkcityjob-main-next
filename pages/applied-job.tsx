


import PageHead from "@/PageHead";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect, FormEvent } from "react"
import axios from "@/api/axios";
import JobBox from "@/components/JobBox/JobBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCircleUser, faRightToBracket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import LoginModal from "@/components/Login/LoginModal";
import Dropdown from 'react-bootstrap/Dropdown';

import SignUpModal from "@/components/SignUp/SignUpModal";
import { toast } from "react-toastify"
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";


export default function Jobs() {
    const settings = {
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        infinite: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    dots: true,
                    infinite: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    dots: true,
                    infinite: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    dots: true,
                    infinite: true,
                    arrows: false,
                }
            }
        ]
    };

    const router = useRouter()

    const [alldata, setAlldata] = useState<any[]>([])
    const [totalpage, setTotalpage] = useState<number>(1)
    const [currentpage, setCurrentpage] = useState<number>(1)
    const [loading, setLoading] = useState(true)

    const [userName, setUserName] = useState<string | null>("")
    const [userid, setUserId] = useState<string | null>("")

    const [jobId, setJobid] = useState("")


    useEffect(() => {
        const getAllApplied = async () => {
            await axios.get(`/api/job/getappliedjob/${userid}`).then((response) => {
                setAlldata(response?.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setAlldata([])
                setTimeout(()=>setLoading(false),1400)
            })
        }
        getAllApplied();
    }, [userid])


    const handleChange = ({ selected }: any) => {
        setLoading(true)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setCurrentpage(selected + 1)
    }



    useEffect(() => {
        if (localStorage.getItem("role") === "user") {
            setUserId(localStorage?.getItem("user_id"))
            setUserName(localStorage?.getItem("name"))
        } else {
            setUserName("")
            setUserId("")
        }
    }, []);



    const handleLogout = () => {
        localStorage.clear()
        setUserName("")
        toast.success('Account has been Logged Out', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Duration in milliseconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        router.push("/jobs")

    };






    return (
        <>

            <PageHead title="Pinkcity Jobs - Trusted Placement Consultant Jaipur" description="Pinkcity Jobs -Fresher job provider in Jaipur" />

            <section className="text-center heading-banner border-bottom">
                <div className="container pb-2">
                    <h1 className="page-title d-inline">Applied Jobs</h1>
                    <Dropdown className="float-right text-white">
                        {userName !== "" ? "Welcome , " + userName : ""}
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="rounded px-4 ms-2">
                            <FontAwesomeIcon icon={faUserTie} width={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/user-profile" className="text-black bg-none"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Profile Page</Link></Dropdown.Item>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/update-profile" className="bg-none text-black"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Update Profile</Link></Dropdown.Item>

                            <Dropdown.Item onClick={handleLogout} className="fw-bold" hidden={userName !== "" ? false : true}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-danger" />Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </section>

            <section>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-3">
                            <li className="breadcrumb-item px-3"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item px-3 active" aria-current="page">Applied Jobs</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {
                loading === true ? <h3 className="text-center my-5">Loading data....</h3> : alldata?.length === 0 ? <h3 className="text-center my-5">Data Not Found!!</h3> :
                    <>
                        <section>

                            <div className="container px-3 mb-5">
                                <div className="row py-4">
                                    {
                                        alldata?.map((item, i) => {
                                            const applied = item?.applied?.map((item: { userid: string }) => item?.userid === userid)[0]
                                            return (
                                                <div className="col-md-4 col-sm-12 col-4 my-4" key={i}>
                                                    <div className="testimonial ">
                                                        <div className="card" >
                                                            <JobBox data={item} applied={applied} />
                                                            <center><Button className="button hover-white mt-md-3 my-3" disabled><span>Applied </span>
                                                            </Button></center>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </section>
                    </>
            }
            <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faArrowRight} width={20} height={20} title="Next"></FontAwesomeIcon>}
                onPageChange={handleChange}
                marginPagesDisplayed={2}
                //pageRangeDisplayed={5}
                pageCount={totalpage}
                previousLabel={<FontAwesomeIcon icon={faArrowLeft} width={20} height={20} className="fa fa-angle-right" title="Next"></FontAwesomeIcon>}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="active"
                disabledClassName="d-none"
            />

        </>
    )
}