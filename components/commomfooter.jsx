import { FaFacebookF, FaGooglePlusG, FaSkype, FaTwitter, FaEnvelope, FaMobileAlt } from "react-icons/fa";
import { FaSquareDribbble } from "react-icons/fa6";
import { AiOutlineDribbble } from "react-icons/ai";

import Image from "next/image";
import style from "@/styles/moduleCSS/commonfooter.module.css"
import Link from "next/link";



const CommonFooter = () => {
    return (
        <footer className={style.footer} >
            <div className="container">
                <div className={`${style.footer_div1} row`} >
                    <div className="col-lg-3 col-md-3 col-sm-12 text-sm-center text-md-start">
                        <ul className={style.footer_logo_ul}>
                            <li ><Link href="#"><Image src="/homepage/logo.png" height={40} width={150} alt="img" /></Link></li>
                            <li  ><Link href="#"><FaEnvelope style={{ color: "#fdef00" }} /> <span>Info@Electricity.com</span></Link></li>
                            <li><Link href="#"><FaMobileAlt style={{ color: "#fdef00" }} /> <span>123-456-7890</span></Link></li>
                            <li className={style.footer_icons}>
                                <Link href="#"><FaFacebookF /></Link>
                                <Link href="#"><AiOutlineDribbble /></Link>
                                <Link href="#"><FaGooglePlusG /></Link>
                                <Link href="#"><FaSkype /></Link>
                                <Link href="#">< FaTwitter /></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 text-sm-center text-md-start">
                        <ul>
                            <li><h4>ABOUT US</h4></li>
                            <li><Link href="#">Support Center</Link></li>
                            <li><Link href="#">Customer Support</Link></li>
                            <li><Link href="#">About Us</Link></li>
                            <li><Link href="#">Copyright</Link></li>
                            <li><Link href="#">Popular Campaign</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 text-sm-center text-md-start">
                        <ul>
                            <li><h4>OUR INFORMATION</h4></li>
                            <li><Link href="#">Return Policy</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Tearms & Conditions</Link></li>
                            <li><Link href="#">Site Map</Link></li>
                            <li><Link href="#">Store Hours</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 text-sm-center text-md-start">
                        <ul>
                            <li><h4>MY ACCOUNT</h4></li>
                            <li><Link href="#">Press Inquiries</Link></li>
                            <li><Link href="#">Socialmedia Directories</Link></li>
                            <li><Link href="#">Images & B-roll</Link></li>
                            <li><Link href="#">Permissions</Link></li>
                            <li><Link href="#">Speaker Requests</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 text-sm-center text-md-start">
                        <ul>
                            <li><h4>POLICY</h4></li>
                            <li><Link href="#">Application Security</Link></li>
                            <li><Link href="#">Software Principles</Link></li>
                            <li><Link href="#">Unwanted Software Policy</Link></li>
                            <li><Link href="#">Responsible Supply Chain</Link></li>

                        </ul>
                    </div>
                </div>
                <hr />
                <div className={`${style.footer_div2} row`}>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-md-start  text-sm-center ">
                        Copyright 2023 Ⓒ Electricity
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  text-md-end text-sm-center mt-2">
                        <Link href="#">Privacy Policy</Link> |
                        <Link href="#">Term of Services</Link> |
                        <Link href="#">Cookie Policy</Link>
                    </div>
                </div>

            </div>

        </footer>);
}

export default CommonFooter;