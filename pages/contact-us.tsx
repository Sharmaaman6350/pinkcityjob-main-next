import PageHead from "@/PageHead";
import { Button, Form } from "react-bootstrap";

export default function ContactUs() {
    return (
        <>
            <PageHead title="Pinkcity Jobs Jaipur - Contact Us- Recruitment, placement Company" description="Pinkcityjobs.com - find contact number, address and details about placement consultant, contact for fresher job, hiring, manpower services, recruitment solutions in jaipur, rajasthan" />

            <section className="text-center heading-banner border-bottom ">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                </div>
            </section>

            <section>

                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-3">
                            <li className="breadcrumb-item"><a href="https://www.pinkcityjobs.com">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                        </ol>

                    </nav>
                </div>
            </section>
            <section>
                <div className="container" id="assign_services">
                    <div className="row mb-4">
                        <div className="col-md-6 ">
                            <div className="card p-3 h-100">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222.3909087931283!2d75.74480926509983!3d26.89541570789862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4ed27bf7c9f%3A0x49d487f02d48b844!2sPinkcityJobs%20-%20Job%20Placement%20Consultancy%20Jaipur!5e0!3m2!1sen!2suk!4v1628827336477!5m2!1sen!2suk"
                                    width={500} height={520} allowFullScreen loading="lazy"></iframe>
                            </div>

                        </div>
                        <div className="col-md-6 ">
                            <Form  className="border px-4 pt-4 pb-5 rounded border-2">
                                <h3 className="text-center">Contact Us</h3>
                                <div className="form-group">
                                    <label htmlFor="name" className="labelStyling">Name:</label>
                                    <Form.Control type="text" id="name" name="name" required placeholder="Enter Name ex: Sherlock Holmes"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="labelStyling">Email:</label>
                                    <Form.Control type="email" className="form-control" id="email" name="email" required placeholder="Enter Email Id ex: sherlockholmes@gmail.com"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="number" className="labelStyling">Phone Number:</label>
                                    <Form.Control type="number" className="form-control"  id="number" name="number" required placeholder="Enter Contact Number ex:1234567899"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message" className="labelStyling">Message:</label>
                                    <Form.Control as="textarea" id="message" name="message" required style={{height:160}}  placeholder="Enter Your Message"/>
                                </div>
                                <Button className="button btn bg-black text-white "><span>Submit</span></Button>
                            </Form>
                        </div>

                    </div>
                </div>
            </section>

            <div className="clearfix"></div>

        </>
    )
}