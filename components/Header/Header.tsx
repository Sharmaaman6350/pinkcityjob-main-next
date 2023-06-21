import axios from "@/api/axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"

const Header = () => {


    const [allpage, setAllPage] = useState<any[]>([])
    useEffect(() => {
        const getPageData = async () => {
            await axios.get(`/api/page/search/?title=`).then((response) => {
                setAllPage(response?.data?.servicepage)
            }).catch((error) => {
                console.log(error?.response?.data?.message)
            })
        }
        getPageData();
    }, [])


    return (



        <header id="header" className="header tra-menu navbar-light ">
            <div className="mt-5 mt-md-0 pt-2 pt-md-0">
                {/* ----- MOBILE HEADER ---- */}
                <div className="sahmobileheader clearfix">
                    <Link id="sahnavtoggle" href="#" className="sahanimated-arrow"><span></span></Link>
                    <span className="smllogo smllogo-black"><Link href="/"><Image
                        src="/images/pinkcityjobs-1625052339-511.png" width={180} height={50} alt="Pinkcity Jobs- Placement Consultant Jaipur" /></Link></span>
                    <span className="smllogo smllogo-white "><Link href="/"><Image
                        src="/images/pinkcityjobs-1625052339-511.png" width={100} height={100} alt="mobile-logo" />
                    </Link></span>
                </div>
                {/* ----- NAVIGATION MENU ---- */}
                <div className="sahmainfull menu clearfix">
                    <div className="sahmainwp clearfix">
                        {/* ----- LOGO IMAGE ---- */}
                        {/* ----- For Retina Ready displays take a image with double the amount of pixels that your image will be displayed (e.g 334 x 80 pixels) ---- */}
                        <div className="desktoplogo"><Link href="/" className="logo-black"><Image
                            src="/images/pinkcityjobs-1625052339-511.png" alt="Pinkcity Jobs" width={200} height={47} /></Link></div>
                        <div className="desktoplogo"><Link href="/" className="logo-white"><Image
                            src="/images/pinkcityjobs-1625052339-511.png" alt="Pinkcity Jobs" width={200} height={47} /></Link></div>
                        {/* ----- MAIN MENU ---- */}
                        <nav className="sahmenu clearfix">
                            <div className="overlapblackbg"></div>
                            <ul className="sahmenu-list">
                                <li className="nl-simple" ><Link href="/">Home</Link></li>

                                <li ><span className="sahmenu-click"><i className="sahmenu-arrow"></i></span><Link
                                    href="/services">Services<span className="saharrow"></span></Link>

                                    <div className="sahmegamenu clearfix">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-3">
                                                    <p className="title h3">Services</p>
                                                    <ul className="link-list list-unstyled">
                                                        {
                                                            allpage?.map((item) => (
                                                                <>
                                                                    {
                                                                        item?.pagetype === "services" ? <li><Link href={`/${item.slug}`}>{item?.title}</Link></li> : ""
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="col-md-4 col-lg-6">
                                                    <p className="title h3">Jobs for Different Industries</p>
                                                    <div className="row">
                                                        {
                                                            allpage?.map((item) => (
                                                                <>
                                                                    {
                                                                        item?.pagetype === "industry" ? <div className="col-md-12 col-lg-6">
                                                                            <ul className="link-list list-unstyled">
                                                                                <li><Link href={`/${item.slug}`}>{item?.title}</Link></li>
                                                                            </ul>
                                                                        </div> : ""
                                                                    }
                                                                </>
                                                            ))
                                                        }


                                                    </div>

                                                </div>

                                                <div className="col-md-4 col-lg-3">
                                                    <p className="title h3">HR Internship & Training</p>
                                                    <ul className="link-list list-unstyled">
                                                    {
                                                            allpage?.map((item) => (
                                                                <>
                                                                    {
                                                                        item?.pagetype === "internship" ? <li><Link href={`/${item.slug}`}>{item?.title}</Link></li> : ""
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </li>




                                <li className="nl-simple" ><Link
                                    href="/reviews/">Reviews</Link></li>
                                <li className="nl-simple" ><Link
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSepPee41LGmuVzljZuvPdMJrIXULHUabwV2nqbzik-yp0Vscg/viewform">Post
                                    Job</Link></li>
                                <li className="nl-simple" ><Link href="/jobs/">Jobs</Link></li>
                                <li className="nl-simple" ><Link href="/submit-resume">Submit
                                    Resume</Link></li>
                                <li className="nl-simple" ><Link href="/blog">Blog</Link></li>

                                {/* ----- HEADER BUTTON ---- */}
                                <li className="nl-simple" >
                                    <Link href="/contact-us"
                                        className="button btn btn-tra-white primary-hover last-link"><span>Contact Us</span></Link>
                                </li>
                            </ul>
                        </nav> {/* ----- END MAIN MENU ---- */}
                    </div>
                </div> {/* ----- END NAVIGATION MENU ---- */}
            </div> {/* ----- End header-wrapper ---- */}

        </header>
    )
}

export default Header;