import PageHead from "@/PageHead";
import axios from "@/api/axios";
import LoginModal from "@/components/Login/LoginModal";
import SignUpModal from "@/components/SignUp/SignUpModal";
import { faCircleUser, faRightToBracket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Dropdown, Form, FormControlProps } from "react-bootstrap";
const worldMapData = require('city-state-country');
import { toast } from "react-toastify"

type userDataType = {
    _id: number,
    name: string,
    number: number | string,
    city: string,
    email: string,

    jobtype: string | {
        _id: number
    },
    position: string | {
        _id: number
    },
    experience: string | {
        _id: number
    },
    qualification: string | {
        _id: number
    },
    about: string,
    address: string,
    state: string,
    country: string,
    file: File | null; // Update the file property type

}

type fileData = {
    originalname: string,
    location: string

};
type TypeData = {
    title: string,
    experience: string,
    _id: number
    position: string,
    qualification: string,
    name: string
}





export default function UpdateProfile() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [userName, setUserName] = useState<string | null>("")
    const [editabledata, setEditabledata] = useState<userDataType>()
    const [jobtype, setJobType] = useState<TypeData[]>([])
    const [experience, setExperience] = useState<TypeData[]>([])
    const [position, setPosition] = useState<TypeData[]>([])
    const [qualification, setQualification] = useState<TypeData[]>([])
    const [countryData, setCountryData] = useState<TypeData[]>(worldMapData.getAllCountries());
    const [stateData, setstateData] = useState<TypeData[]>([]);
    const [cityData, setcityData] = useState<TypeData[]>([]);
    const [filedata, setFiledata] = useState<fileData>()
    //---------- useEffect for getting user details  -------////
    useEffect(() => {
        const id = localStorage?.getItem("user_id")
        const getUserData = async () => {
            await axios.get(`/api/user/${id}`).then((response) => {
                if (response) {
                    setEditabledata(response?.data?.user)
                    if (response?.data?.user?.file.length === 1) {
                        setFiledata({ originalname: response?.data?.user?.file[0].originalname || response?.data?.user?.file[0].key, location: response?.data?.user?.file[0].location })
                    }
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
        if (localStorage.getItem("role") === "user") {
            setUserName(localStorage?.getItem("name"))
        } else {
            setUserName("")
        }
    }, [])


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', editabledata?.name || '');
        formData.append('email', editabledata?.email || '');
        formData.append('number', editabledata?.number?.toString() || '');
        formData.append('address', editabledata?.address || '');
        formData.append('country', editabledata?.country || '');
        formData.append('state', editabledata?.state || '');
        formData.append('city', editabledata?.city || '');
        formData.append('qualification', typeof editabledata?.qualification === 'string' ? editabledata?.qualification : editabledata?.qualification?._id.toString() || '');
        formData.append('experience', typeof editabledata?.experience === 'string' ? editabledata?.experience : editabledata?.experience?._id.toString() || '');
        formData.append('jobtype', typeof editabledata?.jobtype === 'string' ? editabledata?.jobtype : editabledata?.jobtype?._id.toString() || '');
        formData.append('position', typeof editabledata?.position === 'string' ? editabledata?.position : editabledata?.position?._id.toString() || '');

        // Append the file if it exists
        if (editabledata?.file instanceof File) {
            formData.append('file', editabledata?.file as File);
        }

        formData.append('about', editabledata?.about || '');

        await axios.patch(`/api/user/update/${editabledata?._id}`, formData)
            .then((response) => {
                if (response) {
                    toast.success('Profile Successfully Updated', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000, // Duration in milliseconds
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });
                    router.push("/user-profile")
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setTimeout(() => setLoading(false), 1400)
            });
    };

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

    return (
        <>
            <PageHead title="Update Profile - Pinkcity Jobs" description="Update Profile - Pinkcity Jobs" />
            <section className="text-center heading-banner border-bottom">
                <div className="container pb-2">
                    <h1 className="page-title d-inline">Update Profile</h1>
                    <Dropdown className="float-right text-white">
                        {userName !== "" ? "Welcome , " + userName : ""}
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="rounded px-4 ms-2">
                            <FontAwesomeIcon icon={faUserTie} width={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="fw-bold" hidden={userName !== "" ? false : true}><Link href="/user-profile" className="text-black bg-none"><FontAwesomeIcon icon={faCircleUser} width={16} className="mb-1 me-2 text-primary" />Your Profile</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowLoginModal(true)} className="fw-bold" hidden={userName !== "" ? true : false}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Log In</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSignupModal(true)} className="fw-bold" hidden={userName !== "" ? true : false}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-primary" />Sign Up</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="fw-bold" hidden={userName !== "" ? false : true}><FontAwesomeIcon icon={faRightToBracket} width={16} className="mb-1 me-2 text-danger" />Log Out</Dropdown.Item>
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


                            <Form className="border-top px-5 py-3 mb-3 border-bottom border-secondary border-2" onSubmit={handleSubmit}>
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="name" className="labelStyling">Enter Name</label>
                                        <Form.Control type="text" id="name" value={editabledata?.name} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, name: e.target.value };
                                                } return prevData
                                            })
                                        }} className=" bgWhite" placeholder="Enter User Name" required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="email" className="labelStyling">Enter Email</label>
                                        <Form.Control type="email" value={editabledata?.email} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, email: e.target.value };
                                                } return prevData
                                            })
                                        }} id="email" className=" bgWhite " placeholder="Enter  Email" required />
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="number" className="labelStyling">Enter Number</label>
                                        <Form.Control id="number" type="number" className=" bgWhite" value={editabledata?.number} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, number: e.target.value };
                                                } return prevData
                                            })
                                        }} placeholder="Enter User Contact Number" required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1">
                                        <label htmlFor="jobtype" className="labelStyling">Preferred Job Type</label>
                                        <Form.Select id="jobtype" value={typeof editabledata?.jobtype === 'string' ? editabledata.jobtype : editabledata?.jobtype?._id.toString()}
                                            onChange={(e) => {
                                                setEditabledata((prevData) => {
                                                    if (prevData) {
                                                        const newValue = typeof e.target.value === 'string' ? e.target.value : { _id: parseInt(e.target.value) };
                                                        return { ...prevData, jobtype: newValue };
                                                    }
                                                    return prevData;
                                                });
                                            }} required>
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

                                        <Form.Select id="position" value={typeof editabledata?.position === "string" ? editabledata?.position : editabledata?.position?._id.toString()}
                                            onChange={(e) => {
                                                setEditabledata((prevData) => {
                                                    if (prevData) {
                                                        const newValue = typeof e.target.value === "string" ? e.target.value : { _id: parseInt(e.target.value) }
                                                        return { ...prevData, position: newValue };
                                                    } return prevData;
                                                })
                                            }}
                                            required>
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
                                        <Form.Select id="experience" value={typeof editabledata?.experience === "string" ? editabledata?.experience : editabledata?.experience?._id}
                                            onChange={(e) => {
                                                setEditabledata((prevData) => {
                                                    if (prevData) {
                                                        const newValue = typeof e.target.value === "string" ? e.target.value : { _id: parseInt(e.target.value) }
                                                        return { ...prevData, experience: newValue }
                                                    } return prevData
                                                })
                                            }}
                                            required>
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
                                        <Form.Select id="qualification" value={typeof editabledata?.qualification === "string" ? editabledata?.qualification : editabledata?.qualification?._id}
                                            onChange={(e) => {
                                                setEditabledata((prevData) => {
                                                    if (prevData) {
                                                        const newValue = typeof e.target.value === "string" ? e.target.value : { _id: parseInt(e.target.value) }
                                                        return { ...prevData, qualification: newValue }
                                                    } return prevData
                                                })
                                            }}
                                            required>
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
                                        <Form.Control type="text" className=" bgWhite" value={editabledata?.address} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, address: e.target.value }
                                                } return prevData
                                            })
                                        }} placeholder="Enter Your Local Address" required />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <div className="w-100">
                                        <label className="labelStyling">Select Country</label>
                                        <Form.Select value={editabledata?.country || "India"} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, country: e.target.value }
                                                } return prevData
                                            })
                                        }} className="w-100" required>
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
                                        <Form.Select value={editabledata?.state} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, state: e.target.value }
                                                } return prevData
                                            })
                                        }} className="w-100" required>
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
                                        <Form.Select value={editabledata?.city} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, city: e.target.value }
                                                } return prevData
                                            })
                                        }} className="w-100" required>
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
                                        <Form.Control id="about" as="textarea" value={editabledata?.about} onChange={(e) => {
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return { ...prevData, about: e.target.value }
                                                } return prevData
                                            })
                                        }} className="textarea" placeholder="Tell me something about you............." required />
                                    </div>
                                </div>



                                <div className="row my-2">
                                    <div className="col-md-12">
                                        <label className="labelStyling ">Upload Resume File (.pdf format) <span className="text-danger">(Note:Ignore if Already uploaded)</span></label>
                                        <Form.Control id="file" type="file" title="Upload Your Resume" onChange={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            const file = target.files?.[0] || null;
                                            setEditabledata((prevData) => {
                                                if (prevData) {
                                                    return {
                                                        ...prevData,
                                                        file
                                                    };
                                                }
                                                return prevData;
                                            });
                                        }} />
                                        <label className="labelStyling text-red">Uploaded File : 
                                        {filedata?.location && ( <Link href={filedata.location} >{filedata?.originalname} </Link>)}<span className="text-danger"></span></label>
                                    </div>
                                </div>

                                {
                                    loading === true ? <center><Button type="submit" className="button bg-black hover-white mt-md-3 mt-2" disabled={loading}>
                                        <span>Loading... Please Wait!!</span>
                                    </Button></center> : <center><Button type="submit" className="button bg-black hover-white mt-md-3 mt-2" ><span>Update Profile</span>
                                    </Button></center>
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