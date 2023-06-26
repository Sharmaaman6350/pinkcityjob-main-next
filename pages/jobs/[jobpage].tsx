import PageHead from "@/PageHead";
import axios from "@/api/axios";
import LoginModal from "@/components/Login/LoginModal";
import SignUpModal from "@/components/SignUp/SignUpModal";
import UserApplyModal from "@/components/UserApplyModal";
import { faCircleUser, faRightToBracket, faStar, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { toast } from "react-toastify";

type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,
    createdAt: number,
}


type jobDataType = {
    _id: string,
    title: string,
    company: {
        name: string,
        about: string,
    },
    salary: {
        salary: string
    },
    jobtype: {
        title: string
    },
    description: string,
    address: string,
    responsibility: string,
    position: {
        skill: Array<{
            value: string,
            label: string
        }>
    },
    applied: Array<{
        userid: string
    }>,
    slug:string,
    addressone:string,

}



export const getServerSideProps: GetServerSideProps = async (context) => {
    const itemId = context.params?.jobpage;
  
    let data;
    let error;
    const pattern1 = /^([a-zA-Z0-9]+-){1,30}[a-zA-Z0-9]*$/;
    const pattern2 = /^[a-zA-Z0-9]{1,40}$/;
    if (pattern1.test(itemId as string)) {
        await axios
          .get(`/api/job/slug/${itemId}`)
          .then((response) => {
            if (response) {
              data = response?.data;
            }
          })
          .catch(() => {
            error = true;
          });
      } else if (pattern2.test(itemId as string)) {
        await axios
          .get(`/api/job/${itemId}`)
          .then((response) => {
            if (response) {
              data = response?.data?.job;
            }
          })
          .catch(() => {
            error = true;
          });
      }
    if (!data) {
        return {
            props: {
                hasError: true
            }
        }
    };

    return {
        props: {
            data
        }
    }
}



export default function JobPage(props: { data: jobDataType, hasError: Boolean }) {
    const router = useRouter();

    const [allreview, setAllreviews] = useState<DataType[]>([])
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [showUserApplyModal, setShowUserApplyModal] = useState(false)
    const [applied, setapplied] = useState<boolean>(false)
    const [jobId, setJobId] = useState("")

    const [userid, setUserId] = useState<string | null>("")
    const [userName, setUserName] = useState<string | null>("")


    useEffect(() => {
        const getAllReviews = async () => {
            await axios.get(`/api/review/search/?page=1&selectrow=10&title=`)
                .then((res) => {
                    if (res) {
                        setAllreviews(res?.data?.review)
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                })
        }
        getAllReviews()
    }, []);

    useEffect(() => {
        if (localStorage.getItem("role") === "user") {
            setUserName(localStorage?.getItem("name"))
            setUserId(localStorage?.getItem("user_id"))
        } else {
            setUserName("")
            setUserId("")
        }
    }, [])
    useEffect(() => {
        const getApplied = () => {
            const applied = props?.data?.applied?.map((item: { userid: string }) => item?.userid === userid)[0]
            if (applied) {
                setapplied(true)
            } else {
                setapplied(false)
            }
        }
        getApplied();
    }, [userid, props?.data?.applied])
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
    }

    if (props.hasError) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-2xl text-gray-500 font-medium">Invalid Request! The page you are looking, not found.</p>
                <button className="px-5 py-2 bg-red-600 text-white rounded-md" onClick={() => router.back()}>Tap to go back</button>
            </div>
        )
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <PageHead title={`${props?.data?.slug ? props?.data?.slug : props?.data?.title} - Pink City Jobs`} description="Job Page - Pink City Jobs" />

            <section className="text-center heading-banner border-bottom">
                <div className="container pb-2">
                    <h1 className="page-title d-inline">Pinkcity Jobs </h1>
                    <Dropdown className="float-right text-white">
                        {userName !== "" ? "Welcome , " + userName : ""}
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="rounded px-4 ms-2">
                            <FontAwesomeIcon icon={faUserTie} width={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/user-profile" className="text-black bg-none"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Your Profile</Link></Dropdown.Item>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/update-profile" className="text-black bg-none"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Update Profile</Link></Dropdown.Item>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/applied-job" className="bg-none text-black"><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Applied Jobs</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowLoginModal(true)} className="fw-bold" hidden={userName !== "" ? true : false}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Log In</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSignupModal(true)} className="fw-bold" hidden={userName !== "" ? true : false}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Sign Up</Dropdown.Item>
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
                            <li className="breadcrumb-item px-3 " aria-current="page">Jobs</li>
                            <li className="breadcrumb-item px-3 active text-capitalize" aria-current="page">{props?.data?.title}</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="padding30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 order-2 order-lg-1">
                            <div className="page-content border p-3">
                                <div className="post-thumbnail job-details mb-2 mt-2">
                                    <h1>{props?.data?.title}</h1>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Company Name:-</u></strong>{props?.data?.company?.name}</p>
                                    <div className="mb-2 d-flex justify-content-between">
                                        <p className="fw-bold  text-muted"><strong className="text-red me-2 "><u>Salary:-</u></strong>₹{props?.data?.salary?.salary}</p>
                                        <p className="fw-bold text-muted"><strong className="text-red me-2 "><u>Job Type:-</u></strong>{props?.data?.jobtype?.title}</p>
                                    </div>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Job Location:-</u></strong> {props?.data?.address + props?.data?.addressone}</p>
                                    <div className="d-flex "><strong className="text-red me-2 "><u>Full Job Description:-</u></strong> <div dangerouslySetInnerHTML={{ __html: props?.data?.description }} /></div>
                                    <p ><strong className="text-red me-2 "><u>About Company:-</u></strong>  {props?.data?.company?.about}</p>
                                    <strong className="text-red me-2 "><u>Skills Required:-</u></strong> {props?.data?.position?.skill?.map((item: any, i) => (<ul key={i}><li>{item?.value}</li></ul>))}
                                    <div className="d-flex " ><strong className="text-red me-2 "><u>Roles And Responsibilities:-</u></strong><div dangerouslySetInnerHTML={{ __html: props?.data?.responsibility }} /></div> 
                                    {
                                        applied === true ? <center><Button className="button hover-white mt-md-3 my-3" disabled><span>Applied </span>
                                        </Button></center> : <center><Button className="button bg-black hover-white mt-md-3 mt-2" onClick={() => { setShowUserApplyModal(true), setJobId(props?.data?._id) }}><span>Apply Now </span>
                                        </Button></center>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 order-1 order-lg-2 ">

                            <div className="positionSticky">
                                <Image src="/images/pinkcity-jobs-inner-page-imgs.webp" className="w-100" alt="" width={400} height={500} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-red py-md-4" id="call-to-action">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-9">
                            <div className="text-block text-white">
                                <h4 className="mb-0 px-1">Hire Pinkcity Jobs and get hassle free staffing solution, Recruitment Services </h4>
                            </div>
                        </div>
                        <div className="col-md-3 text-center text-md-right"><Link className="hover-white button mt-0 bg-white text-dark"
                            href="https://www.pinkcityjobs.com/contact-us/"><span>contact Us </span></Link></div>
                    </div>
                </div>
            </div>


            <section className="section-main-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testi-section">
                                <h4>Pinkcity Jobs <span className="text-green">Reviews</span></h4>
                                <p >Check recent reviews about Pinkcity Jobs - Trusted Placement & Recruitment Agency</p>
                                <hr />

                                <Slider className=" slider " autoplay={true} autoplaySpeed={6000} dots={true} infinite={true} arrows={false} slidesToShow={1} slidesToScroll={1}>
                                    {
                                        allreview?.map((item, i) => {
                                            const starCount = item?.rating;
                                            const stars = [];
                                            for (let i = 0; i < starCount; i++) {
                                                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="me-1" width={18} height={18} />);
                                            }
                                            return (

                                                <div className="item" key={i}>
                                                    <div className="testi-box ">
                                                        <div className="testimonial border mb-3 ">

                                                            <div className=" pl-md-0">
                                                                <div className="test-text p-md-3 p-2">
                                                                    <div className="displayFlowRoot">
                                                                        <h4 className="tes-title text-green float-left">{item?.title}</h4>
                                                                        <span className="rating d-block float-right">
                                                                            {stars}
                                                                        </span>
                                                                    </div>
                                                                    <div dangerouslySetInnerHTML={{ __html: item?.description?.substring(0, 360) + "....." }} />
                                                                    <div>
                                                                        <span className="float-md-left">{item?.name}</span>
                                                                        , <span>{item?.location}</span>
                                                                        <span className="float-md-right">{moment(item?.createdAt).format("DD-MM-YYYY")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>


                                <div className="text-center mt-5"><a className="button hover-white w-180"
                                    href="/reviews" target="_blank"><span>View All Reviews </span></a></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
            <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
            <UserApplyModal show={showUserApplyModal} setShow={setShowUserApplyModal} id={jobId} setId={setJobId} />
        </>
    )
}