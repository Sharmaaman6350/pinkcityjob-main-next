
import { faAngleDoubleRight,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="bg-green mb-md-0 mb-5" id="footer-top">
            <div className="container">

                <div className="footer-links py-md-4 py-3">
                    <div className="row">

                        <div className="col-md-4">
                            <div className="footer-title">Services for All Location in Jaipur</div>
                            <ul className="list-unstyled text-white">

                                <li> <FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Mansarovar
                                </li>

                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Vaishali Nagar
                                </li>

                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Sodala, Ajmer Road
                                </li>
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Pratap Nagar
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-5">
                            <div className="footer-title">Locations</div>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-unstyled text-white mb-0">
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Sitapura</li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Malviya Nagar, Jaipur</li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Jagatpura</li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>C-Scheme</li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Tonk Road</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-unstyled text-white">
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                            Jhotwara
                                        </li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                            subhash Nagar
                                        </li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                            Bhakrota
                                        </li>
                                        <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                            Sirsi Road
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="footer-title">Services all over Rajasthan</div>
                            <ul className="list-unstyled text-white">
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Jodhpur
                                </li>
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>
                                    Ajmer
                                </li>
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Udaipur</li>
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Kota</li>
                                <li><FontAwesomeIcon icon={faAngleDoubleRight} width={18} height={16} className="me-1 mb-1"/>Alwar</li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <p className="text-white text-center py-1 mb-0 bg-dark">© Copyright 2021 @ Pinkcity Jobs. All Rights Reserved</p>
        </footer>

    )
}

export default Footer;