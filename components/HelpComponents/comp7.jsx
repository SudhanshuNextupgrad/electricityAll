// service history

"use client"
import style from "@/styles/moduleCSS/HelpComponentStyle/comp7.module.css"
import Image from "next/image";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'

import { getData } from "@/helpers/services";

const Comp7 = () => {

    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [serviceHistory, setServiceHistory] = useState([])

    useEffect(() => {
        def_data();
    }, []);

    const def_data = async () => {
        setisSubmitingLoader(true)
        try {
            if (typeof window !== 'undefined') {
                const localUserId = JSON.parse(localStorage.getItem("UserId[C]"))

                const resp = await getData(`/GetServiceBooking?id=${localUserId}`)
                console.log("GetServiceBooking", resp)
                let completedServices = []
                resp?.data?.map((t) => {
                    t.status === "1" ? (completedServices.push(t)) : ("")
                })
                console.log("completedServices", completedServices)
                setServiceHistory(completedServices)
                console.log("serviceHistory", serviceHistory)

            }
        } catch (error) {
            console.log("try-catch error", error)
        }
        setisSubmitingLoader(false)
    }

    return (
        <div >
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}

            <Toaster position="top-center" richColors />
            <div className={style.comp3} >
                
                {serviceHistory.length > 0 ? (serviceHistory.map((t) => (
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <Image src="/ac_service/Layer_50.png" height={100} width={100} alt="img" />
                        </div>
                        <div className={`${style.text} col-md-9`}>
                            <h1>{t.service_name}</h1>
                            <div className={style.text_div1}>
                                <span>${t.service_cost*t.qty}</span>
                                <span style={{ fontWeight: "bold", color: "green" }}>Done</span>
                            </div>
                            <div className={style.text_div2}>
                                <div>
                                    <label>Quantity</label>{" "}
                                    <select id="dropdown" name="dropdown" disabled>
                                        <option value="option1">{t.qty}</option>
                                        <option value="option2">Option 2</option>
                                        {/* <option value="option3">Option 3</option> */}
                                    </select>
                                </div>
                                <div>
                                    <label>Date</label>{" "}
                                    <input type="datetime-local" value={t.service_avail_date} disabled />
                                </div>
                            </div>
                        </div>
                    </div>))) : (<><h1>No data found...</h1></>)}
                {/* <div className="row">
                    <div className="col-md-3 text-center">
                        <Image src="/ac_service/Layer_50.png" height={100} width={100} alt="img" />
                    </div>
                    <div className={`${style.text} col-md-9`}>
                        <h1>Foam & Power jet AC Service (Split)</h1>
                        <div className={style.text_div1}>
                            <span>$599</span>
                            <span>45 mins</span>
                        </div>
                        <div className={style.text_div2}>
                            <div>
                                <label>Quantity</label>{" "}
                                <select id="dropdown" name="dropdown">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label>Date</label>{" "}
                                <input type="datetime-local" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 text-center">
                        <Image src="/ac_service/Layer_50.png" height={100} width={100} alt="img" />
                    </div>
                    <div className={`${style.text} col-md-9`}>
                        <h1>Foam & Power jet AC Service (Split)</h1>
                        <div className={style.text_div1}>
                            <span>$599</span>
                            <span>45 mins</span>
                        </div>
                        <div className={style.text_div2}>
                            <div>
                                <label>Quantity</label>{" "}
                                <select id="dropdown" name="dropdown">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label>Date</label>{" "}
                                <input type="datetime-local" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 text-center  ">
                        <Image src="/ac_service/Layer_50.png" height={100} width={100} alt="img" />
                    </div>
                    <div className={`${style.text} col-md-9`}>
                        <h1>Foam & Power jet AC Service (Split)</h1>
                        <div className={style.text_div1}>
                            <span>$599</span>
                            <span>45 mins</span>
                        </div>
                        <div className={style.text_div2}>
                            <div>
                                <label>Quantity</label>{" "}
                                <select id="dropdown" name="dropdown">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label>Date</label>{" "}
                                <input type="datetime-local" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Comp7;