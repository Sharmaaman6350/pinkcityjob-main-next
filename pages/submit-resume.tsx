import PageHead from "@/PageHead";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";



export default function SubmitResume() {

    return (
        <>
            <PageHead title="Submit Resume - Pinkcity Jobs" description="Submit Resume - Pinkcity Jobs" />

            <section className="text-center heading-banner border-bottom">
                <div className="container">
                    <h1 className="page-title">Submit Resume</h1>
                </div>
            </section>
            <section className="pt-3">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Submit Resume</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section>
                <div className="container" id="assign_services">
                    <div className="card p-3 mb-4 text-center">
                        <h1 className="text-green"> Please mail your resume at </h1>
                        <h5><Link className="call-email text-center text-green"
                            href="mailto:pinkcityjobs123@gmail.com" title="Email Us"><FontAwesomeIcon icon={faEnvelope} width={22} className="me-2 mb-1" height={22}/><span 
                                   >pinkcityjobs123@gmail.com</span></Link></h5>
                    </div>
                </div>
            </section>
        </>
    )
}