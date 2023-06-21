
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {  Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "@/api/axios";


const SignUpModal = ({ show, setShow }: any) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true)
        setShowPassword(false)
        event.preventDefault();
        const data = { name,email, password,confirmpassword }

        await axios.post("/api/user/register", data).then((res) => {
            if (res.status === 200) {
                setShow(false)
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                alert("Your Account Has been Created Successfully.Please Log In again.");
                localStorage.clear()
                window.location.reload()
            }
        }).catch((error) => {
            alert(error?.response?.data?.message)
            setPassword("")
            setConfirmPassword("")
            setTimeout(()=>setLoading(false),1400)
        })
    }
     // Handle hide
     const handleHide = () => {
        setShow(false);
    }
    return (
        <>
            <Modal show={show} size="lg" onHide={handleHide}>
                <Modal.Header  className="border border-0 " closeButton ></Modal.Header>
                <Form className="login__form px-5 text-center" onSubmit={handleSubmit}>
                    <h3 >Sign Up </h3>
                    <p className="text-center">Placement Consultancy And Recruitment Agency Jaipur</p>
                    <div className="w-100 ">
                        <Form.Group className="mb-3 w-100 pe-4">
                            <Form.Control type="text"  className="p-3 bgWhite " value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name ex. William Martin" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100 pe-4">
                            <Form.Control type="email" id="email" className="p-3 bgWhite " value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email ex. williammartin@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100 d-flex">
                            <Form.Control type={showpassword === true ? "text" : "password"} id="password" className="p-3 bgWhite" placeholder="Enter Your Password ex. 12@&812323" value={password} onChange={(e) => setPassword(e.target.value)} /><FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(!showpassword)} className="passwordShow btn bg-pink p-0" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100 d-flex">
                            <Form.Control type={showpassword === true ? "text" : "password"} id="confirmpassword" className="p-3 bgWhite" placeholder="Enter Confirm Password ex. 12@&812323" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} /><FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(!showpassword)} className="passwordShow btn bg-pink p-0" />
                        </Form.Group>

                        {
                            loading === true ? <Button type="submit" className="w-25 bg-pink" >Loading ...</Button> : <Button type="submit" className="w-25 bg-pink " >Sign Up</Button>
                        }

                    </div>
                </Form>
            </Modal>
        </>

    )
}


export default SignUpModal;