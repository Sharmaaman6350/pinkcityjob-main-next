import PageHead from "@/PageHead";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <>
            <PageHead title="Services - Pinkcity Jobs" description="Services - Pinkcity Jobs" />
            <section className="text-center heading-banner border-bottom">
                <div className="container">

                    <h1 className="page-title">Pinkcity Jobs Services</h1>


                </div>
            </section>

            <section>

                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-3">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Services</li>
                        </ol>

                    </nav>
                </div>
            </section>
            <section>
                <div className="container" id="assign_services">
                    <div className="card p-3 mb-4">
                        <div className="row">
                            <div className="col-md-4 text-center mb-3">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">HR Consultacy Services</h2>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mb-3">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">Office Administration Jobs</h2>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mb-3">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">Placement Consultancy </h2>
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">Executive Job placement </h2>
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">Manpower Recruitment Services</h2>
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <div className="border">
                                    <Image src="/images/consultancy.webp" className="img-fluid w-100" width={500} height={100} alt=""/>
                                        <h2 className="h5 my-1">HR Consultacy Services</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}