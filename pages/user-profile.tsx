import PageHead from "@/PageHead";
import axios from "@/api/axios";
import LoginModal from "@/components/Login/LoginModal";
import SignUpModal from "@/components/SignUp/SignUpModal";
import { faCircleUser, faRightToBracket, faStar, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { toast } from "react-toastify";


type userDataType = {
    _id: number,
    name: string,
    number: number | string,
    city: string,
    email: string,

    jobtype: {
        _id: number,
        title: string
    },
    position: {
        _id: number,
        position: string,
        skill: Array<{
            value: string
        }>
    },
    experience: {
        _id: number,
        experience: string
    },
    qualification: {
        _id: number,
        qualification: string
    },
    about: string,
    address: string,
    state: string,
    country: string,
    file: File | null; // Update the file property type

}

type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,
    createdAt: number,
}
type fileData = {
    originalname: string,
    location: string

};

export default function UserProfile() {
    const router = useRouter();
    const [userData, setuserData] = useState<userDataType>()
    const [loading, setLoading] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [showUserApplyModal, setShowUserApplyModal] = useState(false)
    const [jobId, setJobId] = useState("")
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState<string | null>("");
    const [allreview, setAllreviews] = useState<DataType[]>([])
    const [filedata, setFiledata] = useState<fileData>()
    //---------- useEffect for getting user details  -------////
    useEffect(() => {
        const id = localStorage?.getItem("user_id")
        const getUserData = async () => {
            await axios.get(`/api/user/${id}`).then((response) => {
                if (response) {
                    setuserData(response?.data?.user)
                    if (response?.data?.user?.file.length === 1) {
                        setFiledata({ originalname: response?.data?.user?.file[0].originalname || response?.data?.user?.file[0].key, location: response?.data?.user?.file[0].location })
                    }
                    setLoading(false)
                }
            }).catch((error) => {
                toast.error(error?.response?.data?.message)
                setTimeout(() => setLoading(false), 1400)
            })
        }
        if (id) {
            getUserData()
        }
        else {
            alert("Please Login Your Account First")
        }
    }, []);


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
                    setAllreviews([])
                })
        }
        getAllReviews()
    }, []);


    useEffect(() => {
        if (localStorage.getItem("role") !== "user") {
            setShowLoginModal(true)
        } else {
            setUserName(localStorage?.getItem("name"))
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
    }

    console.log(userData)
    return (
        <>
            <PageHead title="User Profile - PinkCity Jobs" description="" />

            <section className="text-center heading-banner border-bottom">
                <div className="container pb-2">
                    <h1 className="page-title d-inline">User Profile</h1>
                    <Dropdown className="float-right text-white">
                        {userName !== "" ? "Welcome , " + userName : ""}
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="rounded px-4 ms-2">
                            <FontAwesomeIcon icon={faUserTie} width={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
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
                            <li className="breadcrumb-item px-3 active text-capitalize" aria-current="page">Profile</li>
                            <li className="breadcrumb-item px-3 active text-capitalize" aria-current="page">{userName}</li>
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
                                    <h1 className="text-center ">Welcome to Your Profile Page {userName}</h1>


                                    <h5 className="text-center mt-5 fw-bold text-red ">Your Basic Details</h5>


                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>User Name:-</u></strong>{userData?.name}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>User Email:-</u></strong>{userData?.email}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>User Number:-</u></strong>{userData?.number}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>User Local Address:-</u></strong>{userData?.address}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>User Location:-</u></strong>{userData?.city + " , " + userData?.state + " , " + userData?.country}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Uploaded Resume:-</u></strong><Link href={`${filedata?.location}`}>{filedata?.originalname}</Link></p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Highest Qualification:-</u></strong>{userData?.qualification?.qualification}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Experience:-</u></strong>{userData?.experience?.experience}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Preferred Position:-</u></strong>{userData?.position?.position}</p>
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>Preferred Job Type:-</u></strong>{userData?.jobtype?.title}</p>
                                    <strong className="text-red me-2 "><u>Your Skills:-</u></strong> {userData?.position?.skill?.map((item, i) => (<ul key={i}><li>{item?.value}</li></ul>))}
                                    <p className="fw-bold text-muted"><strong className="text-red me-2"><u>About YourSelf:-</u></strong>{userData?.about}</p>
                                  

                                    <center><Link href="/update-profile" hidden={userName !== "" ? false : true} className="button bg-black hover-white mt-md-3 mt-2"><span>Update Your Profile </span>
                                    </Link></center> 
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


                                <div className="text-center mt-5"><Link className="button hover-white w-180"
                                    href="/reviews" ><span>View All Reviews </span></Link></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
            <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />

        </>
    )
}

