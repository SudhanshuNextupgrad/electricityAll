import Link from "next/link";
import Head from 'next/head';
import {
  FaCircleUser,
  FaLock,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";

import { getData, postData } from "@/helpers/services";

import { verifyIsLoggedIn } from "@/helpers/helper";
export default function Home() {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Role, setRole] = useState([]);

  useEffect(() => {
    verifyIsLoggedIn(router);
    getRoles();
  }, []);

  //function to get user roles
  async function getRoles() {
    try {
      const result = await getData("/GetRole");
      if (result?.status) {
        // console.log("Roles", result);
        const Employeerole = result?.data?.filter(
          (item) => item?.role_name == "Employee"
        );
        // console.log("Emp role", Employeerole);
        setRole(Employeerole);
      } else {
        toast.error("Unable to fetch role");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (email == "" || password == "" || name == "") {
      toast.error("Please fill out all the fields.");
    } else {
      setisSubmitingLoader(true);
      const resp = await postData("/register", {
        name: name,
        email: email,
        password: password,
        user_type: "Customer",
      });
      console.log(" register result", resp);

      if (resp?.message == "User Created Successfully") {
        toast.success(resp?.message)
        localStorage.setItem("Etoken[C]", resp?.token)
        localStorage.setItem("UserId[C]", resp?.id)
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
      else {
        toast.error(resp?.errors?.email)
      }


      setisSubmitingLoader(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
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
          <div className="container text-center single-page single-pageimage  ">
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
                      onSubmit={handleRegister}
                    >
                      <h2 className="mb-1 font-weight-semibold">Register</h2>{" "}
                      <br></br>
                      <div className="input-group mb-3">
                        <span className="input-group-addon">
                          <FaCircleUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required={true}
                          onChange={(e) => {
                            setname(e?.target?.value);
                          }}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-addon">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email ID"
                          required={true}
                          onChange={(e) => {
                            setemail(e?.target?.value);
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
                            setpassword(e?.target?.value);
                          }}
                        />
                      </div>
                      <div className="row mb-0">
                        <div className="col-12">
                          <button className="btn btn-primary btn-block">
                            Register
                          </button>
                        </div>
                        <div className="col-12 mb-0">
                          Already have account?{" "}
                          <Link
                            href="/login"
                            className="btn btn-link box-shadow-0 px-0"
                          >
                            Sign In
                          </Link>
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
