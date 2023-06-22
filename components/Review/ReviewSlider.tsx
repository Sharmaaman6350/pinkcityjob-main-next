
import { useState, useEffect } from "react"
import axios from "@/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";


type DataType = {
    _id: number,
    title: string,
    name: string,
    location: string,
    description: string,
    rating: number,
    createdAt: number
}
const ReviewSlider = () => {
    const [alldata, setAlldata] = useState<DataType[]>([])
    useEffect(() => {
        const getAllReviews = async () => {
            await axios.get(`/api/review/search/?page=1&selectrow=4&title=`)
                .then((res) => {
                    if (res) {
                        setAlldata(res?.data?.review)
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                })
        }
        getAllReviews()
    }, []);

    return (
        <>
            {
                alldata?.map((item, i) => {
                    const starCount = item?.rating
                    const stars = [];
                    for (let i = 0; i < starCount; i++) {
                        stars.push(<FontAwesomeIcon icon={faStar} className="me-1" width={18} height={18} />)
                    }

                    return (

                        <div className="item" key={i}>
                            <div className="testi-box">
                                <div className="testimonial border mb-3 ">
                                    <div className=" pl-md-0">
                                        <div className="test-text p-md-3 p-2">
                                            <div className="displayFlowRoot">
                                                <h4 className="tes-title text-green float-left text-capitalize">{item?.title}</h4>
                                                <span className="rating d-block float-right">
                                                    {stars}
                                                </span>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: item?.description.substring(0,250) + "....." }} />
                                            <div>
                                                <span className="float-md-left text-capitalize">{item?.name}</span>
                                                , <span>{item?.location}</span>
                                                <span className="float-md-right">{moment(item?.createdAt).format("DD-MM-YYYY")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ReviewSlider;