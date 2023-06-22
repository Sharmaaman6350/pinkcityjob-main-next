import PageHead from "@/PageHead";
import axios from "@/api/axios";
import { faArrowRight, faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import Slider from "react-slick";

type blogDataType = {
    title: string,
    description: string,
    category: string,
}

type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,


}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const itemid = context.params?.blogpage


    let data;
    let error;

    await axios.get(`/api/blog/slug/${itemid}`).then((response) => {

        data = response?.data
    }).catch((error) => {
        error = true
    })


    if (!data) {
        return {
            props: {
                hasError: true
            }
        }
    }
    else {
        return {
            props: { data }
        }
    }
}


export default function BlogPage(props: { data: blogDataType, hasError: boolean }) {
    const router = useRouter();
    const [allreviewdata, setAllReviewdata] = useState<DataType[]>([])
    useEffect(() => {
        const getAllReview = async () => {
            await axios.get(`/api/review/search/?selectrow=10&title=`)
                .then((res) => {
                    if (res) {
                        setAllReviewdata(res?.data?.review)
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                })
        }
        getAllReview()
    }, []);

    if (props.hasError) {
        return (
            <div className="text-center my-4">
                <p className="text-secondary fw-bold text-center">Invalid Request! The page you are looking, not found.</p>
                <button className="btn-dark btn text-white px-3 py-2" onClick={() => router.back()}>Tap to go back</button>
            </div>
        )
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <PageHead title={props.data?.title} description={props.data?.title} />
            <section className="full-breadcrumb py-3">
                <div className="container">
                    <nav >
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link href="/blog/">Blog</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{props.data?.title}</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="padding30 reviews-template">
                <div className="container">
                    <div className="row" id="inner-page">
                        <div id="primary" className="content-area col-md-8">
                            <div className="page-content border p-3">
                                <div className="post-thumbnail mb-2 mt-2">
                                    <Badge className="">{props.data?.category}</Badge>
                                    <h1>{props?.data?.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: props?.data?.description }} />
                                </div>
                            </div>
                        </div>

                        <aside className="col-md-4 mb-4 ">
                            <div className="positionSticky">

                                <div className="card border mb-4">
                                    <div className="card-header bg-green text-white text-center  p-md-3 p-2 shadow">
                                        Reviews
                                    </div>
                                    <div className="card-body">
                                        <Slider className="homebanner slider " autoplay={true} autoplaySpeed={6000} dots={false} infinite={true} arrows={false} slidesToShow={1} slidesToScroll={1}>
                                            {
                                                allreviewdata?.map((item, i) => {

                                                    return (


                                                        <div className="item" key={i}>
                                                            <div className="testimonial">
                                                                <div className="testimonial-content fronts-testi">
                                                                    <p className="h5 text-left text-capitalize">{item?.title}</p>

                                                                    <div dangerouslySetInnerHTML={{ __html: item?.description.substring(0, 200) + "." }} />
                                                                    <p className="testimonial-title h6 mb-0 mt-2 text-capitalize">
                                                                        <span className="text-red">
                                                                            {item?.name}</span>
                                                                        , <span>{item?.location}</span>
                                                                    </p>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </Slider>
                                        <div className="mt-3 text-center">
                                            <Link href="/reviews" className="fw-bold text-black ">View All<FontAwesomeIcon icon={faArrowRight} width={14} className="ms-2 mb-1" /></Link>

                                        </div>
                                    </div>
                                </div>

                                <div className="clearfix"></div>
                                <div className="card other-services shadow">
                                    <div className="card-header bg-black text-white text-center  p-md-3 p-2 shadow">Our Services</div>
                                    <div className="card-body">
                                        <ul className="list-unstyled list">
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/submit-resume" title="Submit Resume" rel="bookmark">Submit Resume</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/office-administration-jobs-in-jaipur" title="Office Administration Jobs in Jaipur" rel="bookmark">Office Administration Jobs in Jaipur</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/staffing-solution" title="Staffing Services in Jaipur" rel="bookmark">Staffing Services in Jaipur</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/placement-consultancy-services-jaipur" title="Placement Consultancy Services Jaipur" rel="bookmark">Placement Consultancy Services Jaipur</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/manpower-recruitment-services" title="Manpower Recruitment Services" rel="bookmark">Manpower Recruitment Services</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/executive-job-placement-services" title="Executive Job placement Services" rel="bookmark">Executive Job placement Services</Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faHandPointRight} className="faHandPoint" width={20} height={20} />
                                                <Link href="/hr-consultancy-services-jaipur" title="HR Consultacy Services Jaipur" rel="bookmark">HR Consultacy Services Jaipur</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>


                    </div>
                </div>

            </section>
            <div className="bg-red py-md-4 " >
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-9">
                            <div className="text-block text-white">
                                <h4 className="mb-0 px-1">Hire Pinkcity Jobs and get hassle free staffing solution, Recruitment Services </h4>
                            </div>
                        </div>
                        <div className="col-md-3 text-center text-md-right"><Link className="hover-white button mt-0 bg-white text-dark"
                            href="/contact-us"><span>contact Us </span></Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}