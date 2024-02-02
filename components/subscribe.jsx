
import style from "@/styles/moduleCSS/subscribe.module.css";
import Link from "next/link";
import { useState } from "react";

import { postData } from "@/helpers/services";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Toaster, toast } from 'sonner';

const Subescribe = () => {
    const [email, setEmail] = useState('')
    const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
    const handleSubscribe = async () => {
        setisSubmitingLoader(true);

        try {
            const resp = await postData("/StoreNewsLetter", {"email": email})
            resp?.message === "News Letter Subscribed" ? toast.success(resp?.message) : toast.error(resp?.message)
            setEmail('')
        } catch (error) {
            console.log("try-catch error", error)
        }
        setisSubmitingLoader(false)
    }

    return (
        <section className={style.section8} >
            {isSubmitingLoader ? (
                <div className="overlay">
                    <div className="spinner-container">
                        <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
                    </div>
                </div>
            ) : null}
            <Toaster position="top-center" richColors />
            <div>
                <h1 >Are You Already Working With Us?</h1>
                <p >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                </p>


                <div className={style.inputWithIcon} >
                    <input type="text" placeholder="Enter Your Email" value={email} onChange={(e) => { setEmail(e.target.value); console.log(e.target.value) }} />
                    <button aria-hidden="true" onClick={handleSubscribe}>SUBSCRIBE</button>
                </div>
            </div>

        </section>
    );
}

export default Subescribe;