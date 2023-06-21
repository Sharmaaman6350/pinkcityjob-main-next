import PageHead from "@/PageHead";
import { faArrowLeft, faArrowRight, faHandPointRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import Link from "next/link";

type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,
}

export default function Blogs() {

    const [alldata, setAlldata] = useState<DataType[]>([])
    const [allreviewdata, setAllReviewdata] = useState<DataType[]>([])
    const [loading, setLoading] = useState(true)
    const [totalpage, setTotalpage] = useState<number>(1)
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getAllBlogs = async () => {
            await axios.get(`/api/blog/search/?page=${page || ""}&selectrow=14&title=`)
                .then((res) => {
                    if (res?.status === 200) {
                        setAlldata(res?.data?.blog)
                        setTotalpage(res.data?.totalPages)
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                    setTimeout(() => setLoading(false), 1000)
                })
        }
        getAllBlogs()
    }, [page]);

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

    const handleChange = ({ selected }: any) => {
        setLoading(true)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPage(selected + 1)
    }
    return (
        <>
            <PageHead title="Pinkcity Jobs Blog - Recruitment" description="Pinkcity Jobs Blog - Find useful resources on recruitment company growth, manpower and staffing retention and many more" />
            <section className="text-center heading-banner border-bottom">
                <div className="container">
                    <h1>Pinkcity Jobs Blog</h1>
                </div>
            </section>
            {
                loading === true ? <h3 className="text-center my-5">Loading data....</h3> : alldata?.length === 0 ? <h3 className="text-center my-5">Data Not Found!!</h3> :
                    <section className="padding30 reviews-template">
                        <div className="container">

                            <div className="row" id="inner-page">
                                <div id="primary" className="content-area col-md-8">
                                    <div className="row">
                                        {
                                            alldata?.map((item, index) => {
                                                const starCount = item?.rating;
                                                const stars = [];
                                                for (let i = 0; i < starCount; i++) {
                                                    stars.push(<FontAwesomeIcon key={i} icon={faStar} className="me-1" width={18} height={18} />);
                                                }

                                                return (
                                                    <>
                                                        <div className="col-md-6" key={index}>
                                                            <div className="bg-light border shadow p-md-3 mb-4 review-box">
                                                                <p className="reviews_heading text-green text-capitalize">{item?.title}</p>
                                                                <div dangerouslySetInnerHTML={{ __html: item?.description?.substring(0,360) + "...." }} />

                                                                <p className="reviews_destination text-red font600 mb-0 text-capitalize">
                                                                    <span>{item?.name}</span>
                                                                    , <span>{item?.location}</span>
                                                                </p>
                                                                <span className="rating">
                                                                    {stars}
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })
                                        }

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
                                                            const starCount = item?.rating;
                                                            const stars = [];
                                                            for (let i = 0; i < starCount; i++) {
                                                                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="me-1" width={18} height={18} />)
                                                            }
                                                            return (


                                                                <div className="item" key={i}>
                                                                    <div className="testimonial">
                                                                        <div className="testimonial-content fronts-testi">
                                                                            <p className="h5 text-left text-capitalize">{item?.title}</p>
                                                                            <div dangerouslySetInnerHTML={{ __html: item?.description.substring(0, 200) + "." }} />
                                                                            <p className="testimonial-title h6 text-center mb-0 text-capitalize">
                                                                                <span className="text-red">
                                                                                    {item?.name}</span>
                                                                                , <span>{item?.location}</span>
                                                                            </p>
                                                                            <span className="rating">
                                                                                {stars}
                                                                            </span>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }


                                                </Slider>

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
                                    <div className="clearfix"></div>

                                </aside></div>

                        </div>


                    </section>
            }


            <ReactPaginate
                breakLabel="..."

                nextLabel={<FontAwesomeIcon icon={faArrowRight} width={20} height={20} title="Next"></FontAwesomeIcon>}
                onPageChange={handleChange}
                marginPagesDisplayed={2}
                //pageRangeDisplayed={5}
                pageCount={totalpage}
                previousLabel={<FontAwesomeIcon icon={faArrowLeft} width={20} height={20} className="fa fa-angle-right" title="Next"></FontAwesomeIcon>}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="active"
                disabledClassName="d-none"
            />

        </>
    )
}