
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast } from "react-toastify"
import { useRouter } from "next/router";
type dataType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string | "">>;
};

type userDataType = {
    name: string,
    email: string,
    number: number,
    address: string,
    city: string,
    state: string,
    country: string,
    about: string,
    qualification: {
        qualification: string
    },
    experience: {
        experience: string
    },
    file?: {
        location: string;
    }[];



}


const UserApplyModal = ({ show, setShow, id, setId }: dataType) => {
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false);
    const [userid, setuserId] = useState<string | null>("")
    const [userdetail, setuserDetail] = useState<userDataType | null>()
    const router = useRouter()
    console.log(userid)
    useEffect(() => {
        if (id) {
            const storedId = localStorage?.getItem("user_id")
            setuserId(storedId);
        } else {
            setuserId("");
        }
    }, [id]);



    useEffect(() => {
        const getUserDetails = async () => {
            await axios.get(`/api/user/${userid}`).then((response) => {
                setuserDetail(response?.data?.user)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setuserDetail(null)
            })
        }
        getUserDetails()
    }, [userid])


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userid === null) {
            alert("Please Log In Your Account First")

        }
        else if (checked === false) {
            alert("Please Click On the Checkbox First ")
        }
        else {
            setLoading(true)
            await axios.patch(`/api/job/applyjob/${id}`, { applied: userid }).then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully Applied")
                    setLoading(false)
                    router.push("/jobs")
                }
            }).catch((error) => {
                console.log(error?.response?.data?.message)
                setTimeout(() => setLoading(false), 1400)
            })
        }
    }



    // Handle hide
    const handleHide = () => {
        setId("")
        setShow(false);
    }
    return (
        <>
            <Modal show={show} size="lg" onHide={handleHide}>
                <Modal.Header className="border border-0 " closeButton ></Modal.Header>
                <Form className="login__form " onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Submit Resume </h3>

                    <div className="w-100 ">
                        <Table bordered striped hover>
                            <tbody>
                                <tr>
                                    <th>User Name</th>
                                    <td className="text-capitalize">{userdetail?.name}</td>
                                </tr>
                                <tr>
                                    <th>User Email</th>
                                    <td>{userdetail?.email}</td>
                                </tr>
                                <tr>
                                    <th>User Contact</th>
                                    <td>{userdetail?.number}</td>
                                </tr>
                                <tr>
                                    <th>User Address</th>
                                    <td className="text-capitalize">{userdetail?.address}</td>
                                </tr>
                                <tr>
                                    <th>User Location</th>
                                    <td className="text-capitalize">{userdetail?.city},{userdetail?.state},{userdetail?.country}</td>
                                </tr>
                                <tr>
                                    <th>Qualification/Experience</th>
                                    <td className="text-capitalize">{userdetail?.qualification?.qualification}/{userdetail?.experience?.experience}</td>
                                </tr>
                                <tr>
                                    <th>About</th>
                                    <td>{userdetail?.about}</td>
                                </tr>
                                <tr>
                                    <th>User Attachment</th>
                                    <td>
                                        <a download href={userdetail?.file?.[0].location} target="_blank" className="fcBlack">Click to preview attachment</a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <label className="d-block d-flex">
                            <input type="checkbox" id="checkbox" className='me-2 mb-2' onClick={() => setChecked(!checked)} checked={checked} />
                            <strong className="mt-2">Click checkbox after checking all the details carefully.</strong>
                        </label>
                        {
                            loading === true ? <Button type="submit" className="w-25 bg-pink" >Loading ...</Button> : <Button type="submit" className="w-25 bg-pink " >Submit Resume</Button>
                        }

                    </div>
                </Form>
            </Modal>
        </>

    )
}


export default UserApplyModal;