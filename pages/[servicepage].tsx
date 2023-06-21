import PageHead from "@/PageHead"
import axios from "@/api/axios";
import ReviewSlider from "@/components/Review/ReviewSlider";

import { GetServerSideProps} from "next"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "react-slick";



interface servicePageDataType {
    id: string,
    seotitle: string,
    seodescription: string,
    title: string,
    description: string
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    const itemId = context.params?.servicepage;
  
    let data;
    let error;

    await axios.get(`/api/page/slug/${itemId}`).then((response)=>{
        if(response){
            data = response?.data
        }
    }).catch((error)=>{
        error = true
    })

    if (!data) {
        return {
            props: {
                hasError: true
            }
        }
    };

    return {
        props: {
            data
        }
    }
}




export default function ServicePage(props: { data: servicePageDataType, hasError: Boolean }) {
    const router = useRouter();
    
    if (props.hasError) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-2xl text-gray-500 font-medium">Invalid Request! The page you are looking, not found.</p>
                <button className="px-5 py-2 bg-red-600 text-white rounded-md" onClick={() => router.back()}>Tap to go back</button>
            </div>
        )
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <PageHead title={`${props?.data?.seotitle} - PinkCityJobs`} description={props.data?.seodescription} />
            <section className="full-breadcrumb py-3">
                <div className="container">
                    <nav >
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{props.data?.title}</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="padding30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 order-2 order-lg-1">
                            <div className="page-content border p-3">
                                <div className="post-thumbnail mb-2 mt-2">
                                    <h1>{props?.data?.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: props?.data?.description }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 order-1 order-lg-2">
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
                            href="/contact-us"><span>contact Us </span></Link></div>
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
                                    <ReviewSlider/>
                                </Slider>


                                <div className="text-center mt-5"><a className="button hover-white w-180"
                                    href="/reviews" target="_blank"><span>View All Reviews </span></a></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}