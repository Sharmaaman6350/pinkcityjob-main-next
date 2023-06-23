import PageHead from "@/PageHead";
import axios from "@/api/axios";
import { faArrowLeft, faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,
}

export default function Reviews() {

    const [alldata, setAlldata] = useState<DataType[]>([])
    const [loading, setLoading] = useState(true)
    const [totalpage, setTotalpage] = useState<number>(1)
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getAllReviews = async () => {
            await axios.get(`/api/review/search/?page=${page || ""}&selectrow=16&title=`)
                .then((res) => {
                    if (res?.status === 200) {
                        setAlldata(res?.data?.review)
                        setTotalpage(res.data?.totalPages)
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                    setTimeout(() => setLoading(false), 1000)
                })
        }
        getAllReviews()
    }, [page]);

    const handleChange = ({ selected }: any) => {
        setLoading(true)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPage(selected + 1)
    }

    return (
        <>
            <PageHead title="Pinkcity Jobs Review - Trusted Placement Consultant Jaipur" description="Pinkcity Jobs Review - Rated 4.9 out of 5 for HR Recruitment, Staffing solution, fresher job provider in Jaipur" />

            <section className="text-center heading-banner border-bottom">
                <div className="container">
                    <h1>Pinkcity Jobs Reviews</h1>
                </div>
            </section>
            {
                loading === true ? <h3 className="text-center my-5">Loading data....</h3> : alldata?.length === 0 ? <h3 className="text-center my-5">Data Not Found!!</h3> :
                    <section id="reviews-page">
                        <div className="container">
                            <section className="padding30 reviews-template">
                                <div >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                {
                                                    alldata?.slice(0, 3).map((item, index) => {
                                                        const starCount = item?.rating;
                                                        const stars = [];
                                                        for (let i = 0; i < starCount; i++) {
                                                            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="me-1" width={18} height={18} />);
                                                        }

                                                        return (

                                                            <div className="col-md-4" key={index}>
                                                                <div className="bg-light border border-muted rounded border-3 shadow p-md-3 mb-4 review-box">
                                                                    <p className="reviews_heading text-green text-capitalize">{item?.title}</p>
                                                                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />

                                                                    <p className="reviews_destination text-red font600 mb-0 text-capitalize" >
                                                                        <span>{item?.name}</span>
                                                                        , <span>{item?.location}</span>
                                                                    </p>
                                                                    <span className="rating">
                                                                        {stars}
                                                                    </span>
                                                                </div>
                                                            </div>


                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="bg-red py-md-4" id="call-to-action">
                            <div className="container">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-9">
                                        <div className="text-block text-white">
                                            <h4 className="mb-0 px-1">Hire Pinkcity Jobs and get hassle free staffing solution, Recruitment Services </h4>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-center text-md-right"><Link className="hover-white button mt-0 bg-white text-dark"
                                        href="https://www.pinkcityjobs.com/contact-us/"><span>contact Us </span></Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <section className="padding30 reviews-template">
                                <div >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                {
                                                    alldata?.slice(3).map((item, index) => {
                                                        const starCount = item?.rating;
                                                        const stars = [];
                                                        for (let i = 0; i < starCount; i++) {
                                                            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="me-1" width={18} height={18} />);
                                                        }

                                                        return (

                                                            <div className="col-md-12" key={index}>
                                                                <div className="bg-light border border-muted rounded border-3 shadow p-md-3 mb-4 review-box">
                                                                    <p className="reviews_heading text-green text-capitalize">{item?.title}</p>
                                                                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />

                                                                    <p className="reviews_destination text-red font600 mb-0 text-capitalize" >
                                                                        <span>{item?.name}</span>
                                                                        , <span>{item?.location}</span>
                                                                    </p>
                                                                    <span className="rating">
                                                                        {stars}
                                                                    </span>
                                                                </div>
                                                            </div>


                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
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