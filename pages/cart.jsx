
import { AiOutlineSearch, AiOutlineDribbble } from "react-icons/ai";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Navbar from "@/components/navbar";
import style from "@/styles/moduleCSS/checkout.module.css";
import Link from "next/link";
import Image from "next/image";
import CommonFooter from "@/components/commomfooter";
import Subescribe from "@/components/subscribe";
import { useEffect, useState } from "react";
import { postData, getData } from "@/helpers/services";
import { getFormatedDate, verifyIsLoggedIn } from "@/helpers/helper";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";
import Head from 'next/head';




const Checkout = () => {
    const [highlight, setHighlight] = useState(0)
    const [highlight2, setHighlight2] = useState(0)
    const [def_selt, setDef_selt] = useState('');
    const [def_dte, setDef_dte] = useState('');
    const [localUserId, setLocalUserId] = useState('')
    const [finalSelect, setFinalSelect] = useState('')
    const [finalDate, setFinalDate] = useState('')
    const [cartList, setCartList] = useState([])
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [cartTotal, setCartTotol] = useState();
    const [finalAmmt, setFinalAmmt] = useState();
    const [refresh, setRefresh] = useState()


    const route = useRouter();

    // console.log("finalDate", finalDate)
    // console.log("finalSelect", finalSelect)

    useEffect(() => {
     
        def_values()
    }, [refresh]);
    const def_values = () => {

        if (typeof window !== 'undefined') {
            // setDef_selt(localStorage.getItem("Elect_service_qty"));
            // setDef_dte(localStorage.getItem("Elect_service_date"));
            localStorage.getItem("UserId[C]") ? setLocalUserId(true) : false
            const cartServices = JSON.parse(localStorage.getItem("Cart"))
            // console.log("cartServices", cartServices)
            setCartList(cartServices ? cartServices : [])
            //adding cart total here
            const total_array = []
            cartServices ? (cartServices.filter((c) => total_array.push(c.service_cost * c.service_quantity))) : ""
            // console.log("total",total_array)
            let total = 0;
            total_array.map((e) => {

                total = total + e;
                setCartTotol(total)
                setFinalAmmt(total + 59)
            })
            // console.log("total",total_array)

        }

    }
    const handleDelete = (t) => {

        if (typeof window !== 'undefined') {
            const Cart = JSON.parse(localStorage.getItem("Cart"))
            console.log("Cart", Cart)
            const updated_cart = []
            Cart?.map((e) => {
                console.log("e", e)
                if (e.service_id === t.service_id && e.service_quantity === t.service_quantity) {
                    toast.success("item deleted successfully!")
                }
                else {
                    updated_cart.push(e)
                }


            })
            console.log("udated_cart", updated_cart)
            localStorage.setItem("Cart", JSON.stringify(updated_cart));
            // window.reload();
            setRefresh(Math.random)
            // route.refresh("/chechout")
            // route.push("/checkout")
            // route.replace(route.asPath);
            //    const obj = .find(o => o.name === 'string 1');
            //    Cart.filter((t)=>{console.log("tfilter",t)})
        }


    }


    // console.log("CArtlist",cartList)
    const handleSubmit = async () => {
        setisSubmitingLoader(true)

        if (typeof window !== 'undefined') {

            if (localStorage.getItem("UserId[C]")) {

                const userID = JSON.parse(localStorage.getItem("UserId[C]"));
                //checking user address and phone no[start]
                const userDetails = await getData(`/GetAllUser?id=${userID}`)
                console.log("userDetails", userDetails)
                if (userDetails?.data[0]?.user_locality != null && userDetails?.data[0]?.user_phno != null) {
                    if (cartList.length > 0) {
                        const services_object = [];
                        cartList.filter((e) => {
                            const single_details = {
                                "service_id": parseInt(e.service_id),
                                "customer_id": userID,
                                "qty": parseInt(e.service_quantity),
                                "service_book_date": getFormatedDate(Date.now(), "YYYY-MM-DD hh:mm:ss"),
                                "service_avail_date": getFormatedDate(e.service_date, "YYYY-MM-DD hh:mm:ss")
                            }
                            services_object.push(single_details)
                        })
                        // console.log("single_details",single_details)
                        // console.log("services_object",services_object)
                        const final_object = {
                            "serivce_data": services_object
                        }

                        console.log("final_object", final_object)
                        const resp = await postData("/StoreServiceBooking", final_object)
                        console.log("resp", resp)
                        if (resp?.message === "Service Created Successfully") {
                            toast.success(resp?.message)
                            localStorage.removeItem("Cart");
                            // setTimeout(() => location.reload(), 2000)
                            setCartTotol(0)
                            setFinalAmmt(0)
                            setRefresh(Math.random)
                        }
                        else {
                            toast.error(resp?.message)
                        }

                    }
                    else {
                        toast.error("Cart is empty...")
                    }
                }
                else {
                    toast.error("Plese provide your address and phone number.")

                    setTimeout(() => route.push("/help"), 2000)
                }
                // checking user address and phone no[end]
                // const services_object = {
                //     "service_data": [{
                //         "service_id": 45,
                //         "customer_id": 13,
                //         "qty": 4,
                //         "service_book_date": "2023-12-15 00:25:12",
                //         "service_avail_date": "2023-12-20 01:20:12"
                //     }, {
                //         "service_id": 45,
                //         "customer_id": 13,
                //         "qty": 4,
                //         "service_book_date": "2023-12-15 00:25:12",
                //         "service_avail_date": "2023-12-20 01:20:12"
                //     }]
                // }
                // console.log("userID",userID);
                // const user_details = await getData("/GetAllUser")
                // console.log("user_details",user_details) 
                // const filterd_user = user_details.data.filter((e)=>{if(e.id==userID){
                //     return e;
                // }})  
                // console.log("filter_user",filterd_user) 
            }
            else {
                toast.error("Please Login / Register first!!")
            }



            // try {
            //         const formateDate = getFormatedDate(finalDate,"YYYY-MM-DD hh:mm:ss")
            //         const today = getFormatedDate(Date.now(),"YYYY-MM-DD hh:mm:ss")
            //      const ServiceBooking={
            //         "service_id":45,
            //         "customer_id":user_id,
            //         "qty":finalSelect,
            //         "service_book_date":today,
            //         'service_avail_date':formateDate
            //      }
            //        console.log("id",user_id)
            //     //  console.log("formated date",Date.now())
            //     //  console.log("formated date today",today)
            //     //  console.log("datenow",new Date())
            //      console.log("servicebooking object",ServiceBooking)
            //     //  console.log("final_Select",finalSelect)
            //     //  console.log("type of finalselect",typeof(Number(finalSelect)))
            //     const resp = await postData("/StoreServiceBooking",ServiceBooking)
            //     console.log("resp",resp)
            //     toast(resp.message);
            // } catch (error) {
            //         console.log("try-catch error",error)
            // }

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
    const handleQuantityChange = (updated_qty, serv_id) => {
        setisSubmitingLoader(true)

        // console.log("e", updated_qty)
        // console.log("t", serv_id)
        if (typeof window !== 'undefined') {
            let existing_cart = JSON.parse(localStorage.getItem("Cart"))
            // console.log("existing_cart", existing_cart)
            let cart = existing_cart.filter((e) => e.service_id == serv_id)
            // console.log("filtered cart item", cart)
            cart[0].service_quantity = updated_qty;
            // console.log("updated cart", cart)
            // console.log("existing",existing_cart)
            localStorage.setItem("Cart", JSON.stringify(existing_cart))
            location.reload()

        }
        setisSubmitingLoader(false)

    }
    const handleDateChange = (updated_date, serv_id) => {
        console.log("updated_date", updated_date)
        console.log("serv_id", serv_id)
        if (typeof window !== 'undefined') {
            let existing_cart = JSON.parse(localStorage.getItem("Cart"))
            // console.log("existing_cart", existing_cart)
            let cart = existing_cart.filter((e) => e.service_id == serv_id)
            // console.log("filtered cart item", cart)
            cart[0].service_date = updated_date;
            // console.log("updated cart", cart)
            // console.log("existing",existing_cart)
            localStorage.setItem("Cart", JSON.stringify(existing_cart))
            location.reload()

        }

    }

    return (
        <div >
            <Head>
                <title>Cart</title>
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
                        <h1 className="innerheading">Checkout</h1>
                    </div>
                </div>
            </section>
            <section className={`${style.section2} container`} >
                <div className="row" >
                    <div className={`${style.section2_col1} col text-center text-lg-start`} >
                        {localUserId ? (<></>) : (<div className={style.account}>
                            <h2>Account</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero magnam fuga blanditiis debitis ipsa voluptates.</p>
                            <button onClick={() => route.push("/login")}>Login</button>
                        </div>)}
                        {/* <div className={style.mobile}>
                            <label>Enter Mobile Number</label>
                            <div>
                                <select id="dropdown" name="dropdown">
                                    <option value="option1">+91</option>
                                    <option value="option2">+92</option>
                                    <option value="option3">+93</option>
                                </select>
                                <input type="number" placeholder="Enter Mobile Number" maxLength="10" />
                            </div>
                        </div>
                        <div className={style.otp}>
                            <label>Varification Code</label>
                            <p>We Have send you 4 digit varification code on <span>+91-7985133197</span></p>
                            <div className="justify-content-center justify-content-lg-start">
                                <input type="text" maxLength="1" />
                                <input type="text" maxLength="1" />
                                <input type="text" maxLength="1" />
                                <input type="text" maxLength="1" />
                            </div>
                        </div>
                        <div className={style.address}>
                            <label>Address</label>
                            <form className="text-start">
                                <input type="text" placeholder="Search for Location" />
                                <AiOutlineSearch />
                            </form>
                            <div>
                                <div>
                                    <FaLocationCrosshairs />
                                    <Link href="#">Use Current Location</Link>
                                </div>
                                <input type="text" placeholder="House/Flat Number*" />
                                <input type="text" placeholder="Landmark(Optional)" />
                                <input type="text" placeholder="Name" />

                            </div>

                        </div> */}
                        {/* <div className={style.timeslot}>
                            <h1>Slot</h1>
                            <h4>When Should the proffesional arrive?</h4>
                            <p>Your service will take approx <span>40</span>mins</p>
                            <div className={`${style.timeslot_day}  justify-content-center justify-content-lg-start`}>
                                <div onClick={() => { setHighlight(1) }} className={highlight === 1 ? "checkout_highlight" : ""}>Fri <br /> <span>29</span></div>
                                <div onClick={() => { setHighlight(2) }} className={highlight === 2 ? "checkout_highlight" : ""}>Sat <br /> <span>30</span></div>
                                <div onClick={() => { setHighlight(3) }} className={highlight === 3 ? "checkout_highlight" : ""}>Sun  <br /> <span>01</span></div>
                            </div>
                            <span>Select start time of service</span>
                            <div className={style.timeslot_time}>
                                <div className="text-center">
                                    <div onClick={() => { setHighlight2(4) }} className={highlight2 === 4 ? "checkout_highlight" : ""}>8:00AM</div>
                                    <div onClick={() => { setHighlight2(5) }} className={highlight2 === 5 ? "checkout_highlight" : ""}>8:30AM</div>
                                    <div onClick={() => { setHighlight2(6) }} className={highlight2 === 6 ? "checkout_highlight" : ""}>9:00AM</div>
                                </div>
                                <div>
                                    <div onClick={() => { setHighlight2(7) }} className={highlight2 === 7 ? "checkout_highlight" : ""}>9:30AM</div>
                                    <div onClick={() => { setHighlight2(8) }} className={highlight2 === 8 ? "checkout_highlight" : ""}>10:00AM</div>
                                    <div onClick={() => { setHighlight2(9) }} className={highlight2 === 9 ? "checkout_highlight" : ""}>10:30AM</div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className={style.seasonoffer}>
                            <div >
                                <div>
                                    <div>
                                        <h1>Its Summer Time !</h1>
                                        <p>Get 30% Off First 50 Order</p>
                                        <div>
                                            <Link href="#">BOOK SERVICES</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Image
                                            src="/homepage/Layer_31.png"
                                            height={150}
                                            width={300}
                                            alt="img"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <h1>Its All Time Offer !</h1>
                                    <div>
                                        <div>
                                            <p>Get 45% Off More then 10 Services</p>
                                            <div>
                                                <Link href="#">BOOK SERVICES</Link>
                                            </div>
                                       </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_35.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className={style.section4_div1}>
                            <div className={style.section4_div1_div2}>
                                <div>
                                    <h1>Its Summer Time !</h1>
                                    <div>
                                        <div>
                                            <p>Get 30% Off First 50 Order.</p>
                                            <div>
                                                <Link href="/services">BOOK SERVICES</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_31.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.section4_div1_div2}>
                                <div>
                                    <h1>Its All Time Offer !</h1>
                                    <div>
                                        <div>
                                            <p>Get 45% Off More then 10 Services</p>
                                            <div>
                                                <Link href="/services">BOOK SERVICES</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_35.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className={style.cancellation}>
                            <h3>Cancellation Policy</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, modi animi? Exercitationem aut reprehenderit recusandae nisi dolore fuga quod libero!</p>
                        </div>
                    </div>


                    <div className={`${style.section2_col2} col text-center text-lg-start`} >
                        {/* {cartList.map((t)=>{})} */}
                        <div className={style.foam}>
                            {cartList.length > 0 ? (cartList.map((t, index) => (
                                <div key={index} className={style.cartItem}>
                                    {/* <hr /> */}
                                    <h1 className="text-center">{t.service_name}</h1>
                                    <div className={style.foam_payment}>
                                        <span>$ {t.service_cost * t.service_quantity}</span>
                                        <span onClick={() => handleDelete(t)}><MdDelete /></span>
                                    </div>
                                    {/* { console.log("t",t.service_cost)} */}
                                    <div className={style.quantity}>
                                        <div>
                                            <label>Quantity</label>{" "}
                                            <select id="dropdown" name="dropdown" value={t.service_quantity} onChange={(e) => handleQuantityChange(e.target.value, t.service_id)}>
                                                <option value="choose" >choose</option>
                                                <option value="1" >1</option>
                                                <option value="2" >2</option>
                                                <option value="3" >3</option>
                                                <option value="4" >4</option>
                                                <option value="5" >5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Date</label>{" "}
                                            <input type="datetime-local" value={t.service_date} onChange={(e) => handleDateChange(e.target.value, t.service_id)} min={getCurrentDateTime()} />

                                        </div>
                                    </div>
                                    {/* <hr/> */}
                                </div>
                            ))) : (<div className={style.emptyCart}><h2>Cart is empty...</h2></div>)}
                            {/* <div className={style.payment}>
                                <h2>Payment Method</h2>
                                <Link href="/services" >Book other services</Link>
                            </div> */}
                            {/* <div className={style.coupons}>
                                <p><FiCheck />Avoid calling before reaching the location</p>
                                <div>
                                    <div>
                                        <BiSolidOffer />
                                        <Link href="#">Coupons and offers</Link>
                                    </div>
                                    <div>
                                        <Link href="#">Login/Signup to view offers</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className={style.paymentsummry}>
                            <h2>Payment Summary</h2>
                            <div>
                                <span>Item Total</span>
                                <span>${cartTotal ? cartTotal : 0}</span>
                            </div>
                            <div>
                                <span>Tax & Fee</span>
                                <span>$59</span>
                            </div>
                            <hr />
                            <div>
                                <span>Total</span>
                                <span>${finalAmmt ? finalAmmt : 0}</span>
                            </div>
                            <div className={style.ttlpmt}>
                                <span>Ammount to Pay</span>
                                <span>${finalAmmt ? finalAmmt : 0}</span>
                            </div>
                            <hr />

                        </div>
                        <div className={style.payment}>
                            <h2>Payment Method</h2>
                            {localUserId ? (<Link href="#" onClick={handleSubmit}>Pay ${finalAmmt ? finalAmmt : 0}</Link>) : (<Link href="/login" >Login to Book Service</Link>)}
                        </div>
                        <div className={style.payment}>

                            <Link href="/service" >Book other services</Link>
                        </div>

                        {/* <div className={style.seasonoffer}>
                            <div >
                                <div>
                                    <div>
                                        <h1>Its Summer Time !</h1>
                                        <p>Get 30% Off First 50 Order</p>
                                        <div>
                                            <Link href="#">BOOK SERVICES</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Image
                                            src="/homepage/Layer_31.png"
                                            height={150}
                                            width={300}
                                            alt="img"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <h1>Its All Time Offer !</h1>
                                    <div>
                                        <div>
                                            <p>Get 45% Off More then 10 Services</p>
                                            <div>
                                                <Link href="#">BOOK SERVICES</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_35.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className={style.section4_div1}>
                            <div className={style.section4_div1_div2}>
                                <div>
                                    <h1>Its Summer Time !</h1>
                                    <div>
                                        <div>
                                            <p>Get 30% Off First 50 Order.</p>
                                            <div>
                                                <Link href="#">BOOK SERVICES</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_31.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.section4_div1_div2}>
                                <div>
                                    <h1>Its All Time Offer !</h1>
                                    <div>
                                        <div>
                                            <p>Get 45% Off More then 10 Services</p>
                                            <div>
                                                <Link href="#">BOOK SERVICES</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Image
                                                src="/homepage/Layer_35.png"
                                                height={150}
                                                width={400}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}



                    </div>
                </div>
            </section>
            <section>
                <Subescribe />
                <CommonFooter />
            </section>
        </div>
    );
}

export default Checkout;