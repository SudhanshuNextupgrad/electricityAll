// chat

import { CiImageOn } from "react-icons/ci";
import style from "@/styles/moduleCSS/HelpComponentStyle/comp4.module.css"
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
const Comp4 = () => {

    const [inputmsg,setInputmsg] = useState('');
    return (
        <>
            <div className={style.message}>
                <div className={style.message1}>
                    <div className={style.ques}>
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, commodi?</p>
                            <span>10:00AM</span>
                        </div>
                        <GoDotFill />
                    </div>
                    <div className={style.rply}>
                        <GoDotFill />
                        <div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, ipsa consequatur voluptatum reiciendis alias cumque.</p>
                            <span>10:10AM</span>
                        </div>

                    </div>
                    <div className={style.ques}>

                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat nulla deleniti commodi id quasi ullam maxime consequuntur, praesentium doloribus.</p>
                            <span>10:20AM</span>
                        </div>
                        <GoDotFill />
                    </div>
                    <div className={style.rply}>
                        <GoDotFill />
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laboriosam at cumque amet delectus eligendi. Ipsum eos obcaecati earum expedita error dignissimos, adipisci doloribus numquam.</p>
                            <span>10:30AM</span>
                        </div>

                    </div>
                    <div className={style.ques}>

                        <div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus voluptatibus culpa quis omnis unde, praesentium esse fugiat quam et accusantium alias. Dicta reiciendis enim tempora exercitationem aliquam quibusdam unde harum.</p>
                            <span>10:40AM</span>
                        </div>
                        <GoDotFill />
                    </div>
                    <div className={style.rply}>
                        <GoDotFill />
                        <div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ullam maiores error eius quis. Nulla vero consequuntur voluptate magnam vel.</p>
                            <span>10:50AM</span>
                        </div>

                    </div>
                </div>
                <div>
                    <div className={style.msg_user}>
                        <Image src="/homepage/1.jpg" height={50} width={50} alt="img" />
                        <p>Waiting for a customer support excutive</p>
                    </div>
                    <div className={style.msg_input}>
                        <input type="text"  placeholder="Start typing your message" value={inputmsg} onChange={(e)=>setInputmsg(e.target.value)}/>
                        <CiImageOn />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comp4;