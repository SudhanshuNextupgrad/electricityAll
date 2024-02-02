
//help with services
import style from "@/styles/moduleCSS/HelpComponentStyle/comp3.module.css"
import Image from "next/image";
import { getData } from "@/helpers/services";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'
const Comp3 = () => {

    // const [localUserId, setLocalUserId] = useState('');
    const [serviceBookingList, setServiceBookingList] = useState([]);
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);

    useEffect(() => {
        def_data();
    }, []);


    const def_data = async () => {
        setisSubmitingLoader(true)
        try {
            if (typeof window !== 'undefined') {
                // setLocalUserId(JSON.parse(localStorage.getItem("ElectricityId")))
                const user_id = JSON.parse(localStorage.getItem("UserId[C]"));
                // console.log("ElectricityId",JSON.parse(localStorage.getItem("ElectricityId")))

                console.log("user_id", user_id)
                const resp = await getData(`/GetServiceBooking?id=${user_id}`)
                console.log("GetServiceBooking", resp)
                let activeServices = [];
                resp?.data?.map((t) => {
                    if (t.status == "0") {
                        activeServices.push(t)
                    }

                })
                // console.log("activeServices",activeServices)
                setServiceBookingList(activeServices)



            }
        } catch (error) {
            console.log("try-catch", error)
        }

        setisSubmitingLoader(false)
    }

    return (
        <>
            <div className={style.comp3}>
                {isSubmitingLoader ? (
                    <div className="overlay">
                        <div className="spinner-container">
                            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                        </div>
                    </div>
                ) : null}

                <Toaster position="top-center" richColors />
                {serviceBookingList.length > 0 ? (serviceBookingList.map((t) => (
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <Image src="/ac_service/Layer_50.png" height={100} width={100} alt="img" />
                        </div>
                        <div className={`${style.text} col-md-9`}>
                            <h1>{t.service_name}</h1>
                            <div className={style.text_div1}>
                                <span>${t.service_cost*t.qty}</span>
                                <span style={{ fontWeight: "bold", color: "red" }}>Ongoing</span>
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
        </>
    );
}

export default Comp3;