import Head from 'next/head';
import style from "@/styles/moduleCSS/services.module.css"
import { FaSearch, FaUser, FaBars } from "react-icons/fa"
import Image from "next/image";
import Navbar from "@/components/navbar";
import Subescribe from "@/components/subscribe";
import CommonFooter from "@/components/commomfooter";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";

import { getData } from "@/helpers/services";




const Services = () => {
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [getService, setGetService] = useState([])
    const [service_id, setService_id] = useState('');


    const route = useRouter();

    useEffect(() => {
        get_services()
        
    }, []);
   

   

    const get_services = async () => {
        const resp = await getData("/GetService")
        const filteredService = resp?.data?.filter((item)=>item.service_status==1)
        setGetService(filteredService);
    }
    return (
        <div >
            <Head>
                <title>Services</title>
            </Head>
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}
            <Toaster position="top-center" richColors />
            <section className={style.section1}>
                <div className="container">
                    <div className="row align-items-center">
                        <Navbar />
                        <h1 className="innerheading">Services</h1>
                    </div>
                </div>
            </section>
            <section className={style.section2}>
                <div className="container">
                    <div className="row align-items-center">
                        {getService
                            ?//conditional operator
                            getService?.map((t, index) => (
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4" key={index}>
                                    
                                   
                                    
                                    <Image src="/services/icon4.png" height={100} width={100} alt="img" />
                                    <h2 onClick={() => route.push(`/singleService?id=${t.subscription_id}`)}>{t.service_names}</h2>
                                    <p>{t.service_des} </p>
                                  
                                </div>))
                            :
                            (<div className="col-xxl-4 col-xl-4 col-lg-4">
                                <Image src="/services/icon2.png" height={100} width={100} alt="img" />
                                <h2 onClick={() => { route.push("/singleService?id=54") }}>Dummy service</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </div>)}

                        {/* <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <Image src="/services/icon2.png" height={100} width={100} alt="img" />
                            <h2>Lorem Ipsum is Simply</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <Image src="/services/icon3.png" height={100} width={100} alt="img" />
                            <h2>Lorem Ipsum is Simply</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>


                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <Image src="/services/icon4.png" height={100} width={100} alt="img" />
                            <h2>Lorem Ipsum is Simply</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <Image src="/services/icon5.png" height={100} width={100} alt="img" />
                            <h2>Lorem Ipsum is Simply</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <Image src="/services/icon6.png" height={100} width={100} alt="img" />
                            <h2>Lorem Ipsum is Simply</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div> */}
                    </div>

                </div>
            </section>
            <section className={style.section3}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <h2>FEATURES</h2>
                            <p>OUR WORK FLOW</p>
                            <div className={style.section3_designs}>
                                <div><Image src="/services/design1.png" height={125} width={140} alt="img" /></div>
                                <div>
                                    <h3>Lorem Ipsum is Simply</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                            <div className={style.section3_designs_shift}>
                                <div><Image src="/services/design2.png" height={125} width={140} alt="img" /></div>
                                <div>
                                    <h3>Lorem Ipsum is Simply</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                            <div className={style.section3_designs}>
                                <div><Image src="/services/design3.png" height={125} width={140} alt="img" /></div>
                                <div>
                                    <h3>Lorem Ipsum is Simply</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>

                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 text-center">
                            <Image src="/services/Layer_63.png" height={550} width={500} alt="img" className={style.designimg} />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Subescribe />
            </section>
            <section>
                <CommonFooter />
            </section>





        </ div>

    );
}

export default Services;
