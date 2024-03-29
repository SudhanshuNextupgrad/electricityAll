
import Image from "next/image";
import Head from 'next/head';
import { GoDotFill } from "react-icons/go";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill, PiNumberCircleFiveFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import style from "@/styles/moduleCSS/acservice.module.css";
import Accordion from 'react-bootstrap/Accordion';
import Subscribe from "@/components/subscribe";
import CommonFooter from "@/components/commomfooter";

import { getData } from "@/helpers/services";
import { Toaster, toast } from 'sonner'

import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { verifyIsLoggedIn } from "@/helpers/helper";


const ACservices = () => {
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [serv_date, setServ_date] = useState('')
    const [serv_name, setServ_name] = useState('')
    const [serv_cost, setServ_cost] = useState('')

    const route = useRouter();
    const searchParams = useSearchParams();
    const id_in_url = searchParams.get("id");


    // console.log("id", id_in_url);
    // console.log("quantity", quantity);
    // console.log("date", serv_date)
    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        const getServiceResp = await getData(`/GetOneService?id=${id_in_url}`);
        console.log("getServiceResp", getServiceResp);
        // setServ_name("service name")
        getServiceResp?.data[0]?.service_names
            ? //conditional operator used here
            setServ_name(getServiceResp?.data[0]?.service_names)
            :
            setServ_name("Service Name");

        setServ_cost(getServiceResp?.data[0]?.service_cost)
    }
    const handleCart = (e) => {
        e.preventDefault();
        setisSubmitingLoader(true)
        if (serv_date !== "" && quantity !== "") {
            try {
                if (typeof window !== 'undefined') {
                    const NewServ = {
                        "service_id": id_in_url,
                        "service_date": serv_date,
                        "service_quantity": quantity,
                        "service_name": serv_name,
                        "service_cost": serv_cost
                    }
                    console.log("NewServ", NewServ)
                    if (localStorage.getItem("Cart") === null) {
                        localStorage.setItem("Cart", JSON.stringify([]))
                    }
                    const existingCart = JSON.parse(localStorage.getItem("Cart"))
                    existingCart.push(NewServ)
                    localStorage.setItem("Cart", JSON.stringify(existingCart))
                    toast.success("Service added to Cart")

                    setTimeout(() => { route.push("/service") }, 1500)
                    // else {

                    //     const existingCart = JSON.parse(localStorage.getItem("Cart"))
                    //     existingCart.push(NewServ)
                    //     localStorage.setItem("Cart", JSON.stringify(existingCart))
                    //     toast.success("Service added to Cart")
                    // }
                }
            } catch (error) {
                console.log("try-catch error", error)
            }
        } else {
            toast.error("Please choose correctly!!")
        }
        setisSubmitingLoader(false)
    }
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };



    return (
        <div >
            <Head>
                <title>Select Service</title>
            </Head>
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}
            <Toaster position="top-center" richColors />
            <section className={`${style.section1} container-fluid`}  >
                <div className="container">
                    <div className="row align-items-center">
                        <Navbar />
                        <h1 className="innerheading">AC Services & Repair</h1>
                    </div>
                </div>

            </section>
            <section className={`${style.section2} container`} >
                <div className="row" >
                    <div className={`${style.section2_div1} col-xs-12 col-sm-12 col-md-12 col-lg-6 text-sm-center text-lg-start text-xs-center`} >
                        <Image src="/ac_service/Layer_50.png" width={500} height={500} alt="img" />
                    </div>
                    <div className={`${style.section2_div2} col-xs-12  col-sm-12 col-md-12 col-lg-6 text-sm-center text-lg-start  text-xs-center`} >
                        <span>30 DAYS WARRENTY</span>
                        <h1>{serv_name}</h1>
                        <div>
                            <span>$ {quantity > 0 ? serv_cost * quantity : 0}</span>
                            <span>45 mins</span>
                        </div>
                        <ul className="text-start">
                            <li>Get 2X deeper dust removal with Foam + Power Jet technology</li>
                            <li>Intense cleaning of both inner and outer units</li>
                            <li>Get 2X deeper dust removal with Foam + Power Jet technology</li>
                            <li>Intense cleaning of both inner and outer units</li>
                        </ul>
                        <div>
                            <div>
                                <label>Quantity</label>{" "}
                                <select id="dropdown" name="dropdown" onChange={(e) => setQuantity(e.target.value)}>
                                    <option defaultValue="select"> Select</option>
                                    <option defaultValue="1"> 1</option>
                                    <option value="2"> 2</option>
                                    <option value="3"> 3</option>
                                    <option value="4"> 4</option>
                                    <option value="5"> 5</option>
                                </select>
                            </div>
                            <div>
                                <label>Date</label>{" "}
                                <input type="datetime-local" onChange={(e) => setServ_date(e.target.value)} min={getCurrentDateTime()} />
                            </div>
                            {/* min='2023-12-24T07:37' */}
                        </div>

                        <div className={style.bttn}>
                            <Link href="#" onClick={handleCart}>Add to Cart</Link>
                        </div>
                        {/* <div className={style.bttn}>
                            <Link href="/services" >Book other Services</Link>
                        </div> */}

                    </div>
                </div>


            </section>
            <section className={style.section3}>
                <div className="container">
                    <h1>How it works</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, consequuntur voluptas. Tempora saepe, soluta nobis cumque officia nostrum sequi similique!</p>
                    <div className="row " >
                        <div className="col-md-6 text-xs-center col-xs-12 col-sm-12 col-lg-6 col-xl-6 col-xxl-6" >
                            <ul>
                                <li>
                                    <span>1</span>
                                    <div>
                                        <span>Pre-Service checks</span>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, quam.</p>
                                    </div>
                                </li>
                                <li>
                                    <span>2</span>
                                    <div>
                                        <span>Pre-Service checks</span>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit rerum quae soluta!</p>
                                    </div>
                                </li>
                                <li>
                                    <span>3</span>
                                    <div>
                                        <span>Pre-Service checks</span>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam vitae expedita voluptate neque deleniti.</p>
                                    </div>
                                </li>
                                <li>
                                    <span>4</span>
                                    <div>
                                        <span>Pre-Service checks</span>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, tempora mollitia. Maiores minus ex non illo?</p>
                                    </div>
                                </li>
                                <li>
                                    <span>5</span>
                                    <div>
                                        <span>Pre-Service checks</span>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, officiis asperiores nisi est magnam blanditiis distinctio amet optio?</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className=" col-md-6 text-xs-center col-sm-12 col-lg-6 col-xl-6 col-xxl-6 text-center" >
                            <Image src="/ac_service/Layer_63.png" height={500} width={500} alt="img" />
                        </div>

                    </div>
                </div>
            </section>
            <section className={style.section4}>
                <div className="mt-5">
                    <div>
                        <h1>Frequenty asked Questions</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam. Dicta, incidunt dolor voluptatibus officia necessitatibus atque?</p>
                        <div className={`${style.checkout_accordian} container ac_accordian`}>
                            <div className='row'>
                                <Accordion flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut recusandae maiores quia quibusdam?</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                            </div>
                        </div>

                    </div>
                    <div className={`${style.section4_div2} container `} >
                        <h1>Customer Reviews</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deleniti expedita ullam consequatur consectetur totam repudiandae, sunt sint eaque optio.</p>
                        <div className="row" >
                            <div className={`${style.range_div}  col-xs-12 col-sm-12 col-md-6`}>
                                <p>4.83<span><FaStar /></span></p>
                                <span>26.8k reviews</span>
                                <ul>
                                    <li>5<FaStar /><input style={{ accentColor: " black;" }} type="range" min={0} max={5} defaultValue={5} /><span>25.2k</span></li>
                                    <li>4<FaStar /><input style={{ accentColor: " black;" }} type="range" min={0} max={5} defaultValue={3} /><span>6.1k</span></li>
                                    <li>3<FaStar /><input style={{ accentColor: " black;" }} type="range" min={0} max={5} defaultValue={2} /><span>7.2k</span></li>
                                    <li>2<FaStar /><input style={{ accentColor: " black;" }} type="range" min={0} max={5} defaultValue={2} /><span>8.3k</span></li>
                                    <li>1<FaStar /><input style={{ accentColor: " black;" }} type="range" min={0} max={5} defaultValue={1} /><span>9.4k</span></li>
                                </ul>

                            </div>
                            <div className={`${style.testimonial_div}  col-xs-12 col-sm-12 col-md-6 `}>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <Image src="/ac_service/4.jpg" height={50} width={50} alt="img" /></div>
                                            <div>
                                                <span>Maria<br />
                                                    sept 2023</span>
                                            </div>
                                        </div>
                                        <div>
                                            5<FaStar />
                                        </div>
                                    </div>
                                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam modi eligendi dicta repellendus sint necessitatibus quae deleniti. Corporis, inventore?</div>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <Image src="/ac_service/4.jpg" height={50} width={50} alt="img" /></div>
                                            <div>
                                                <span>Maria<br />
                                                    sept 2023</span>
                                            </div>
                                        </div>
                                        <div>
                                            5<FaStar />
                                        </div>
                                    </div>
                                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam modi eligendi dicta repellendus sint necessitatibus quae deleniti. Corporis, inventore?</div>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <Image src="/ac_service/4.jpg" height={50} width={50} alt="img" /></div>
                                            <div>
                                                <span>Maria<br />
                                                    sept 2023</span>
                                            </div>
                                        </div>
                                        <div>
                                            5<FaStar />
                                        </div>
                                    </div>
                                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam modi eligendi dicta repellendus sint necessitatibus quae deleniti. Corporis, inventore?</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Subscribe />
                <CommonFooter />

            </section>

        </div>);
}

export default ACservices;