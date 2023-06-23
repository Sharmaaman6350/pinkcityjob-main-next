
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "@/api/axios";
import SignUpModal from "../SignUp/SignUpModal";
import { useRouter } from "next/router";
import { toast } from "react-toastify"
type dataType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    jobid?: string | "";
    setJobId?: React.Dispatch<React.SetStateAction<string | "">>;
};

const LoginModal = ({ show, setShow, jobid, setJobId }: dataType) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false)
    const handleSubmit = async (event: any) => {
        setLoading(true)
        setShowPassword(false)
        event.preventDefault();
        const data = { email, password }

        await axios.post("/api/user/login", data).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res?.data?.token);
                localStorage.setItem("user_id", res?.data?.user?._id);
                localStorage.setItem("name", res?.data?.user?.name);
                localStorage.setItem("role", res?.data?.user?.role);
                setShow(false)
                setEmail("")
                setPassword("")
                setLoading(false)
                toast.success('Account has been Successfully Logged In', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000, // Duration in milliseconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
                if (jobid) {
                    router.push(`/jobs/${jobid}`)
                }
                else {
                    router.reload()
                }

            }
        }).catch((error) => {
            alert(error?.response?.data?.message)
            setPassword("")
            setTimeout(() => setLoading(false), 1400)
        })
    }
    // Handle hide
    const handleHide = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        if (setJobId) {
            setJobId("")
          }
    }
    return (
        <>
            <Modal show={show} size="lg" onHide={handleHide}>
                <Modal.Header className="border border-0"></Modal.Header>
                <Form className="login__form px-5 text-center" onSubmit={handleSubmit}>
                    <h3>Log In Your Account </h3>
                    <p className="text-center">Placement Consultancy And Recruitment Agency Jaipur</p>
                    <div className="w-100 ">
                        <Form.Group className="mb-3 w-100 pe-4">
                            <Form.Control type="email" id="email" className="p-3 bgWhite " value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email ex. williamsmith@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100 d-flex">
                            <Form.Control type={showpassword === true ? "text" : "password"} id="password" className="p-3 bgWhite" placeholder="Enter Your Password ex.123*$3216^5^&*" value={password} onChange={(e) => setPassword(e.target.value)} /><FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(!showpassword)} className="passwordShow btn bg-pink p-0" />
                        </Form.Group>

                        {
                            loading === true ? <Button type="submit" className="w-25 bg-pink" >Loading ...</Button> : <Button type="submit" className="w-25 bg-pink " >Log In</Button>
                        }

                        <a className="d-block mt-3" href="#" onClick={() => setShowSignupModal(true)}>Create New Account</a>

                    </div>
                </Form>
            </Modal>
            <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
        </>

    )
}


export default LoginModal;