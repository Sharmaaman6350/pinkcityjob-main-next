import PageHead from "@/PageHead";
import ReviewSlider from "@/components/Review/ReviewSlider";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap, faBook, faUser, faFileAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
    return (
        <>
            <PageHead title="Placement Consultancy Services Jaipur, Vaishali Nagar - Pinkcity Jobs" description="Placement Consultancy Services Jaipur - Pinkcity Jobs is one of the trusted job placement consultant in Vaishali Nagar, You can approch our HR Recruitment agency" />
            <div className="main-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="top-banner-text text-md-left text-center">
                                <div className="banner-top-heading text-white">
                                    <h1>Placement Consultancy & <span>Recruitment Agency Jaipur</span></h1>
                                    <p>Pinkcity Jobs is a leading Manpower Recruitment Consultancy in Jaipur, India. From Engineering to Sales
                                        and Marketing positions, you will be able find jobs that suit your experience level with Pinkcity&apos;s
                                        recruitment services.
                                        PinkCityJobs offers one of the most comprehensive lists of employment opportunities available for
                                        professionals who are looking for work or just starting out their careers.</p>

                                </div>
                                <div className="banner-features d-none d-md-block">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="feature align-items-center">
                                                <FontAwesomeIcon icon={faSmile} width={44} height={44} />
                                                

                                                <div className="feature-text">
                                                    <h5 className="f-title"> HR Consultancy</h5>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="feature align-items-center">
                                                <FontAwesomeIcon icon={faBook} width={44} height={44} />

                                                <div className="feature-text">
                                                    <h5 className="f-title">Placement Services</h5>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="feature align-items-center">
                                                <FontAwesomeIcon icon={faUser} width={44} height={44} />

                                                <div className="feature-text">
                                                    <h5 className="f-title">Job Recruiter</h5>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="feature align-items-center">
                                                <FontAwesomeIcon icon={faGraduationCap} width={44} height={44} />

                                                <div className="feature-text">
                                                    <h5 className="f-title">Fresher&apos;s Job</h5>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 align-self-center text-center">
                            <Image src="/images/banner-pink-city-man-1.png" className="img-fluid" alt="banner-img" width={600} height={400} />
                        </div>
                    </div>
                </div>
            </div>



            <section className="section-main-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="text-new text-block">
                                <h2 className="block-title">Hire HR Consultancy Services<br /><span>for Smooth Recruitment Process</span></h2>
                                <p>Pinkcity Jobs is your one stop shop for all of your recruitment needs. Whether you&apos;re a small business or
                                    large corporation, we can help find the perfect candidates to grow with you! To succeed in today&apos;s world
                                    and tomorrow&apos;s economy it takes more than just talent - if you want to thrive and compete then having an
                                    excellent team that eats together, works hard together and grows as a family unit will be what makes the
                                    difference between success or failure. We care about our clients&apos; bottom line so they don&apos;t have to spend
                                    time looking at stacks of resumes themselves when their job could instead go towards growing their company
                                    by hiring people who are qualified AND passionate about helping them reach new heights every day.</p>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <Image src="/images/hr-recruitment-process.png" className="img-fluid" width={600} height={100} alt="" />
                                </div>
                                <div className="col-md-6">
                                    <Image src="/images/hr-recruitment-process-1.png" className="img-fluid" alt="" width={600} height={100} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section className="section-main-padding mt-md-0 mt-3" id="services">
                <div className="container">
                    <div className="section-heading pt-3 pt-md-0">
                        <h2 className="section-heading-title text-center">Best Placement consultancy services from
                            <br />
                            <span className="text-green">Experienced HR Managers</span>
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6 left-box">
                            <div className="box position-relative">
                                <div className="box-content-box">
                                    <div className="box-heading">
                                        <FontAwesomeIcon icon={faFileAlt} width={66} height={70} />

                                        <Link href="#">
                                            <h4 className="box-title">Permanent & Contract
                                                <span>Staffing Services</span>
                                            </h4>
                                        </Link>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="box-content"></div>
                                    <p>Permanent staff and contract employees need a reliable partner to help them find quality
                                        work.Recruiters at Permanent & Contract staffing services are committed to finding the best opportunity
                                        <span id="dots">...</span><span id="more">for you with their unmatched expertise, industry knowledge,
                                            connections and focus on client service. For over 30 years we&apos;ve had success matching talented
                                            candidates like yourself with employers who have an immediate opening or one in development from our
                                            database of more than 1 million open positions nationwide! We&apos;re ready when you are so contact us
                                            today!</span><button id="myBtn">Read more</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left-box">

                            <div className="box position-relative">

                                <div className="box-content-box">
                                    <div className="box-heading">

                                        <FontAwesomeIcon icon={faFileAlt} width={66} height={70} />
                                        <Link href="#">
                                            <h4 className="box-title">Payroll
                                                <span> Outsourcing Services</span>
                                            </h4>
                                        </Link>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="box-content"></div>
                                    <p>It&apos;s not easy working with the human body all day, so many people need a break from their jobs.
                                        Outsourcing services can relieve some of that burden by taking care of tedious administrative tasks and
                                        paperwork like payroll for you!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left-box">
                            <div className="box position-relative mb-md-0">
                                <div className="box-content-box">
                                    <div className="box-heading">
                                        <FontAwesomeIcon icon={faFileAlt} width={66} height={70} />
                                        <Link href="#">
                                            <h4 className="box-title">Domestic and Overseas
                                                <span> Executive Recruitment Services</span>
                                            </h4>
                                        </Link>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="box-content"></div>
                                    <p>Executive search services are a great way to find the best candidates for your company. These companies
                                        have extensive databases and connections, which will allow them to help you hire top talent in any
                                        industry <span id="dots1">...</span><span id="more1">or position that is available. They work with both
                                            employers and job seekers so they can handle every aspect of this process from start-to-finish on
                                            behalf of their clients</span><button id="myBtn1">Read more</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left-box">
                            <div className="box position-relative mb-md-0">
                                <div className="box-content-box">
                                    <div className="box-heading">
                                        <FontAwesomeIcon icon={faFileAlt} width={66} height={70} />
                                        <Link href="#">
                                            <h4 className="box-title"> Fresher&apos;s
                                                <span> Job Opportuities</span>
                                            </h4>
                                        </Link>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="box-content">
                                        <p>Our company helps newcomers in getting jobs! We have a team of experienced recruiters who know the
                                            ins and outs of hiring. You can also find many opportunities, as well as what it takes to land them on
                                            our site.<span id="dots2">...</span><span id="more2">The company&apos;s recruitment process is designed to
                                                help recent graduates find jobs that fit their skills and educational background.</span><button
                                                    id="myBtn2">Read more</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <center><Link className="button hover-white mt-md-5 mt-2" href="/contact-us"><span>Contact
                        Us </span>
                    </Link></center>
                </div>
            </section>

            <section className="section-main-padding" id="process">
                <div className="container">
                    <div className="section-heading text-center">
                        <div className="section-heading-title">
                            Simplified Recruitment Process at
                            <br />
                            <span className="text-green">Pinkcity Jobs</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="box">
                                <div className="order-2 order-md-1">
                                    <div className="box-heading">
                                        <h4 className="box-title"><span>1</span>Agreement & Profiling</h4>
                                        <p>When you decide to work with us, We create an agreement and then then do screening for suitable
                                            profile according Job Description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="order-2 order-md-1">
                                    <div className="box-heading">
                                        <h4 className="box-title"><span>2</span>Sourcing & Interviewing</h4>
                                        <p>After first round of screening, interview process starts. HR schedule telephonic or face to face
                                            interview with recruiter on suitable time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="order-2 order-md-1">
                                    <div className="box-heading">
                                        <h4 className="box-title"><span>3</span>Job Offer & Onboarding</h4>
                                        <p>Once you find a suitable candidate after interview round, we pass offer letter, do background check
                                            process and then onboarding</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <div className="bg-green " id="call-to-action">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="text-block text-white text-center">
                                <h4>Choose best placement company to make your recruitment process easy and faster </h4>
                                <p className="mb-0  text-center">
                                    PinkcityJobs - We help clients to find suitable candidate for different job profile range executive search
                                    to top management
                                </p>
                                <Link className="button hover-white" href="/contact-us"><span>Order Now </span></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <section className="section-main-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="testi-section">
                                <h4>Pinkcity Jobs<span className="text-green"> Reviews</span></h4>
                                <p>Check recent reviews about Pinkcity Jobs - Trusted Job Placement Consultant in Jaipur</p>



                                <ReviewSlider/>

                                

                                <center><Link className="button hover-white mt-4 mt-md-5" href="/reviews/"><span>View All
                        Reviews </span></Link></center>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Frequently <span className="text-green">Asked Questions</span></h4>
                            <p>Have any doubt regarding the placement and recruitment services. Please read some of the mostly
                                asked question and if still you have some doubt just drop a mail to us</p>


                            <div id="accordionExample" className="accordion">
                                <div className="accordion-item ">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            what guarantees do you offer when placing workers?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How do you ensure strong retention?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            What happens if the employee leaves?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            What is the CV selection process?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Have you placed candidates in similar roles before?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSix">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                            Have you placed candidates in similar roles before?
                                        </button>
                                    </h2>
                                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>



        </>
    )
}