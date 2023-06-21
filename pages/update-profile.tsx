import PageHead from "@/PageHead";
import axios from "@/api/axios";
import LoginModal from "@/components/Login/LoginModal";
import SignUpModal from "@/components/SignUp/SignUpModal";
import { faCircleUser, faRightToBracket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
const worldMapData = require('city-state-country');

type userDataType = {
    name: string,
    number: number,
    city: string,
    email: string,
    jobtype: {
        _id: number
    },
    position: {
        _id: number
    },
    experience: {
        _id: number
    },
    qualification: {
        _id: number
    },
    about: string,
    address: string,
    state: string,
    country: string,
    file: {
        originalname: string,
        location: string
    }

}
type TypeData = {
    title: string,
    experience: string,
    _id: number
    position: string,
    qualification: string,
}

type locationDataType = {
    name: string
}



export default function UpdateProfile() {
    const [loading, setLoading] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [userName, setUserName] = useState<string | null>("")
    const [editabledata, setEditabledata] = useState<userDataType>()
    const [jobtype, setJobType] = useState<TypeData[]>([])
    const [experience, setExperience] = useState<TypeData[]>([])
    const [position, setPosition] = useState<TypeData[]>([])
    const [qualification, setQualification] = useState<TypeData[]>([])
    const [countryData, setCountryData] = useState<locationDataType[]>(worldMapData.getAllCountries());
    const [stateData, setstateData] = useState<locationDataType[]>([]);
    const [cityData, setcityData] = useState<locationDataType[]>([]);

    //---------- useEffect for getting user details  -------////
    useEffect(() => {
        const id = localStorage?.getItem("user_id")
        const getUserData = async () => {
            await axios.get(`/api/user/${id}`).then((response) => {
                if (response) {
                    setEditabledata(response?.data?.user)
                    setLoading(false)
                } else {
                    alert("Something Went Wrong Please Try Again")
                    setTimeout(() => setLoading(false), 1400)
                }
            }).catch((error) => {
                alert(error?.response?.data?.message)
                setTimeout(() => setLoading(false), 1400)
            })
        }
        if (id) {
            getUserData()
        }
        else {
            alert("Please Login Your Account First")
        }
    }, [])

    useEffect(() => {
        const statesList = worldMapData.getAllStatesFromCountry(editabledata?.country);
        setstateData(statesList);
    }, [editabledata]);

    useEffect(() => {
        const citiesList = worldMapData.getAllCitiesFromState(editabledata?.state);
        setcityData(citiesList)

    }, [editabledata]);
    //---------- useEffect for getting all job type for select -------////
    useEffect(() => {
        const getJobType = async () => {
            await axios.get("/api/jobtype/search/?selectrow=2000").then((response) => {
                setJobType(response?.data?.jobType)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setJobType([])
            })
        }
        getJobType();
    }, []);


    //---------- useEffect for getting all experience for select -------////
    useEffect(() => {
        const getExperience = async () => {
            await axios.get("/api/experience/search/?selectrow=2000").then((response) => {
                setExperience(response?.data?.experience)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setExperience([])
            })
        }
        getExperience();
    }, [])


    //---------- useEffect for getting all position for select -------////
    useEffect(() => {
        const getPosition = async () => {
            await axios.get("/api/position/search/?selectrow=2000").then((response) => {
                setPosition(response?.data?.position)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setPosition([])
            })
        }
        getPosition();
    }, [])
    //---------- useEffect for getting all qualification for select -------////
    useEffect(() => {
        const getQualification = async () => {
            await axios.get("/api/qualification/search/?selectrow=2000").then((response) => {
                setQualification(response?.data?.qualification)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setQualification([])
            })
        }
        getQualification();
    }, [])

    useEffect(() => {
        if (localStorage.getItem("role") !== "user") {
            setShowLoginModal(true)
        } else {
            setUserName(localStorage?.getItem("name"))
        }
    }, [showLoginModal])


    const handleLogout = () => {
        localStorage.clear()
        setUserName("")
        alert("Account has been Logged Out")
        window.location.reload()
    }

    return (
        <>
            <PageHead title="Update Profile - Pinkcity Jobs" description="Update Profile - Pinkcity Jobs" />
            <section className="text-center heading-banner border-bottom">
                <div className="container pb-2">
                    <h1 className="page-title d-inline">Update Profile</h1>
                    <Dropdown className="float-right text-white">
                        Welcome , {userName}
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="rounded px-4 ms-2">
                            <FontAwesomeIcon icon={faUserTie} width={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="fw-bold"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Update Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowLoginModal(true)} className="fw-bold"><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Log In</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSignupModal(true)} className="fw-bold"><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Sign Up</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="fw-bold"><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-danger" />Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </section>
            <section className="userDetails">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-4 text-center">
                            <FontAwesomeIcon icon={faCircleUser} width={100} />
                        </div>
                        <div className="col-md-8 ">
                            <h4 className="fw-bold">User Basic Details</h4>
                            <p className=""><strong className="me-2">Name:-</strong>{editabledata?.name}</p>
                            <p className=""><strong className="me-2">Email Id:-</strong>{editabledata?.email}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="userDetails">
                <div className="container">
                    <div className="row mt-3 ">
                        <h4 className="fw-bold text-center">Update Your Profile</h4>
                        <div className="col-md-12">


                            <Form className="border-top px-5 py-3 mb-3 border-bottom border-secondary border-2">
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="name" className="labelStyling">Enter Name</label>
                                        <Form.Control type="text" id="name" value={editabledata?.name} className=" bgWhite" placeholder="Enter User Name" required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="email" className="labelStyling">Enter Email</label>
                                        <Form.Control type="email" value={editabledata?.email} id="email" className=" bgWhite " placeholder="Enter  Email" required />
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="number" className="labelStyling">Enter Number</label>
                                        <Form.Control id="number" type="number" className=" bgWhite" value={editabledata?.number} placeholder="Enter User Contact Number" required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="jobtype" className="labelStyling">Preferred Job Type</label>
                                        <Form.Select id="jobtype" value={editabledata?.jobtype?._id} required>
                                            <option value="">Select Job Type</option>
                                            {
                                                jobtype?.map((item, i) => {
                                                    return (
                                                        <option value={item?._id} key={i}>{item?.title}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label className="labelStyling">Preferred Position</label>

                                        <Form.Select id="position" value={editabledata?.position?._id} required>
                                            <option value="">Select Position</option>
                                            {
                                                position?.map((item, i) => {
                                                    return (
                                                        <option value={item?._id} key={i}>{item?.position}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="experience" className="labelStyling">Select Experience</label>
                                        <Form.Select id="experience" value={editabledata?.experience?._id} required>
                                            <option value="">Select Experience</option>
                                            {
                                                experience?.map((item, i) => {
                                                    return (
                                                        <option value={item?._id} key={i}>{item?.experience}</option>
                                                    )
                                                })
                                            }

                                        </Form.Select>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="qualification" className="labelStyling">Enter Highest Qualification</label>
                                        <Form.Select id="qualification" value={editabledata?.qualification?._id} required>
                                            <option value="">Select Qualification</option>
                                            {
                                                qualification?.map((item, i) => {
                                                    return (
                                                        <option value={item?._id} key={i}>{item?.qualification}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>

                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label className="labelStyling">Enter Your Local Address</label>
                                        <Form.Control type="text" className=" bgWhite" value={editabledata?.address} placeholder="Enter Your Local Address" required />
                                    </div>
                                </div>





                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <div className="w-100">
                                        <label className="labelStyling">Select Country</label>
                                        <Form.Select value={editabledata?.country || "India"} className="w-100" required>
                                            <option value="">Select Country</option>
                                            {
                                                countryData?.map((item, i) => {
                                                    return (
                                                        <option value={item?.name} key={i}>{item?.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                    </div>
                                    <div className="w-100">
                                        <label className="labelStyling">Select State</label>
                                        <Form.Select value={editabledata?.state} className="w-100" required>
                                            <option value="">Select State</option>
                                            {
                                                stateData?.map((item, i) => {
                                                    return (
                                                        <option value={item?.name} key={i}>{item?.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                    </div>
                                    <div className="w-100">
                                        <label className="labelStyling">Select City</label>
                                        <Form.Select value={editabledata?.city} className="w-100" required>
                                            <option value="">Select City</option>
                                            {
                                                cityData?.map((item, i) => {
                                                    return (
                                                        <option value={item?.name} key={i}>{item?.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                </div>


                                <div className="row my-2">
                                    <div className="col-md-12">
                                        <label htmlFor="about" className="labelStyling"> Tell Us About You</label>
                                        <Form.Control id="about" as="textarea" value={editabledata?.about} className="textarea" placeholder="Tell me something about you............." required />
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-12">
                                        <label className="labelStyling ">Upload Resume File (.pdf format) <span className="text-danger">(Note:Ignore if Already uploaded)</span></label>
                                        <Form.Control id="file" type="file" title="Upload Your Resume" />
                                        <label className="labelStyling">Uploaded File : <span className="text-danger"></span></label>
                                    </div>
                                </div>




                                {
                                    loading === true ? <Button type="submit" className="bg-pink btnSubmit " size="sm" disabled={loading}>
                                        Loading... Please Wait!!
                                    </Button> : <Button type="submit" className="bg-pink btnSubmit " size="sm" >
                                        Submit
                                    </Button>
                                }
                            </Form>
                        </div>

                    </div>
                </div>
            </section>
            <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
            <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
        </>
    )
}