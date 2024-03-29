import Head from "next/head";
import Image from "next/image";

// import styles from "@/styles/Home.module.css";
import {
  FaCircleUser,
  FaLock,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import { postData } from "@/helpers/services";
import { verifyIsLoggedIn } from "@/helpers/helper";
import Cookies from 'js-cookie';

export default function Home() {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    defaultLogin();
  }, []);

  const defaultLogin = () => {
    if (localStorage.getItem("Etoken[E]")) { router.push("/employee") }
    if (localStorage.getItem("Etoken[A]")) { router.push("/admin") }
  }

  // Cookies.set('language', "hindi");
  // console.log("cookie",Cookies.get("language"));



  //function to manage login form
  async function handleSubmit(event) {
    event.preventDefault();
    setisSubmitingLoader(true);
    if (email == "" || pass == "") {
      toast.error("Please fill out all the fields.");
    } else {

      const result = await postData("/login", { email: email, password: pass });
      console.log("result", result);
      if (result?.data?.name?.user_type == "Customer") {
        localStorage.setItem("Etoken[C]", result.data.token);
        localStorage.setItem("UserId[C]", result.data.name.id);

        toast.success("Login Successfull");
        router.push("/");
      } else if (result?.data?.name?.user_type == "Admin") {
        localStorage.setItem("Etoken[A]", result.data.token);
        localStorage.setItem("UserId[A]", result.data.name.id);
        router.push("/admin/")

      }
      else if (result?.data?.name?.user_type == "Employee") {
        localStorage.setItem("Etoken[E]", result.data.token);
        localStorage.setItem("UserId[E]", result.data.name.id);
        router.push("/employee/")
      }
      else {
        toast.error("Login Failed [Unauthorised]");
      }
    }
    setisSubmitingLoader(false)
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {isSubmitingLoader ? (
        <div className="overlay">
          <div className="spinner-container">
            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
          </div>
        </div>
      ) : null}
      <Toaster position="top-center" richColors />
      <div className="page">
        <div className="page-single construction-body">
          <div className="container text-center single-page single-pageimage">
            <div className="row">
              <div className="col-xl-7 col-lg-6 col-md-12">
                <img
                  src="/login.svg"
                  className="construction-img mb-7 h-480  mt-5 mt-xl-0"
                  alt=""
                />
              </div>
              <div className="col-xl-5  col-lg-6 col-md-12 ">
                <div className="col-lg-11">
                  <img
                    src="/logo.png"
                    className="header-brand-img light-view mb-4"
                    alt="logo"
                  />
                  <div className="wrapper wrapper2">
                    <form
                      id="login"
                      className="card-body"
                      tabIndex={500}
                      onSubmit={handleSubmit}
                    >
                      <h2 className="mb-1 font-weight-semibold">Login </h2>
                      <p className="mb-6">Sign In to your account</p>
                      <div className="input-group mb-3">
                        <span className="input-group-addon">
                          <FaCircleUser />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          required={true}
                          onChange={(e) => {
                            setEmail(e?.target?.value);
                          }}
                        />
                      </div>
                      <div className="input-group mb-4">
                        <span className="input-group-addon">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required={true}
                          onChange={(e) => {
                            setPass(e?.target?.value);
                          }}
                        />
                      </div>
                      <div className="row mb-0">
                        <div className="col-12">
                          <button className="btn btn-primary btn-block">
                            Login
                          </button>
                        </div>
                        <div className="col-12 mb-0">
                          <Link
                            href="/forgot"
                            className="btn btn-link box-shadow-0 px-0"
                          >
                            Forgot password?
                          </Link>
                          <br />
                          <Link
                            href="/"
                            className="btn btn-link box-shadow-0 px-0"
                          >
                            Homepage
                          </Link>
                          <p className=" mb-0">
                            Don't have account?
                            <Link href="/register" className="text-primary ml-1">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                    <div className="card-body social-icons border-top">
                      <a className="btn  btn-social btn-fb mr-2">
                        <FaFacebookF />
                      </a>
                      <a className="btn  btn-social btn-googleplus mr-2">
                        <FaYoutube />
                      </a>
                      <a className="btn  btn-social btn-twitter-transparant  ">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
