//ticket generate
import style from "@/styles/moduleCSS/HelpComponentStyle/comp2.module.css"

import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';

import { getData,postData } from "@/helpers/services";
import { useRouter } from "next/navigation";




const Comp2 = () => {
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const [userId, setUserId] = useState(null);
    const [service_list, setService_list] = useState([])
    const [unique_service_id, setUnique_service_id] = useState('');
    const [serviceName, setServiceName] = useState('')
    const [quantity, setQuantity] = useState(null);
    const [Description, setDescription] = useState("");
    const [serviceId, setServiceId] = useState(null)
    

    const route = useRouter()
    useEffect(() => {
        getServices()
    }, []);

    const getServices = async () => {
        setisSubmitingLoader(true)
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("UserId[C]"))
            // console.log("userId", userId)
            const resp = await getData(`/GetServiceBooking?id=${user}`)
            // console.log("resp", resp)
            setUserId(user)
            setService_list(resp?.data)
        }
        setisSubmitingLoader(false)

    }
    const ticketSubmit = async (e) => {
        setisSubmitingLoader(true)
        e.preventDefault()
        // console.log("userId",userId)
        // console.log("unique_service_id",unique_service_id)
        // console.log("serviceID",serviceId)
        // console.log("description",Description)   
        const ticketDetails = {
            "customer_id": userId,
            "unique_service_id": unique_service_id,
            "service_id": serviceId,
            "issue_desc": Description
        }
        // console.log("final data", ticketDetails)
        const resp = await (postData("/StoreSupportTicket", ticketDetails))
        // console.log("resp from server", resp)
        resp?.message === "Ticket Created Successfully" ? toast.success(resp?.message) : toast.error(resp?.message)
        
        setTimeout(()=>{location.reload()},2000)
        
        setisSubmitingLoader(false)



    }
    
    const ticketSelect = (uniqueid) => {
        setisSubmitingLoader(true)
        // console.log("uniqueid", uniqueid)
        setUnique_service_id(uniqueid)
        service_list?.map((item) => {
            if (item.unique_service_id == uniqueid) {
                setQuantity(item.qty)
                setServiceName(item.service_name)
                setServiceId(item.service_id)

            }
        })
        // console.log("llist",list)
        setisSubmitingLoader(false)
    }
    // console.log("unique_service_id", unique_service_id)

    return (
        <>
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}

            <Toaster position="top-center" richColors />
            <div className="container-fluid">
                <div className="row">
                    <div className={style.comp2}>
                        <h1>We are here to assist you !</h1>
                        <p>Please complete the form below for your complaints</p>
                        <form>
                            <select id="dropdown" name="dropdown" placeholder="Service Type" onChange={(e) => { ticketSelect(e.target.value) }}>
                                <option value="Choose Service" >Choose</option>
                                {service_list ? service_list.map((item, index) => (
                                    <option value={item.unique_service_id} key={index}>Service Request No : {item.unique_service_id}</option>
                                )) : null}



                            </select>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" placeholder="Service Name" value={serviceName} disabled />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" placeholder="Quantity" value={quantity} disabled />
                                </div>
                                {/* <div className="col-md-6">
                                    <input type="email" placeholder="Quantity" />
                                </div>
                                <div className="col-md-6">
                                    <input type="number" placeholder="Phone No." />
                                </div> */}
                            </div>
                            <textarea rows="10" cols="50" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                            <div className={style.bttn}>
                            <button onClick={ticketSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Comp2;