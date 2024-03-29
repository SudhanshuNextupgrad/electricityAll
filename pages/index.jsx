import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import style from '@/styles/moduleCSS/Home.module.css'
import { useState, useEffect } from "react";
import Link from 'next/link';
import { FaBars, FaUser, FaShoppingCart, FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { postData } from '@/helpers/services';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaFacebookF, FaGooglePlusG, FaSkype, FaTwitter } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineSearch, AiOutlineDribbble } from "react-icons/ai";
import MainFooter from "@/components/commomfooter.jsx";
import Subescribe from "@/components/subscribe";
import Swiper1 from "@/components/swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Modal from 'react-bootstrap/Modal';
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';
import { getData } from '@/helpers/services';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const route = useRouter();

  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState()
  const [user_name, setUser_name] = useState('')
  const [user_photo, setUser_photo] = useState(null)
  const [sliderServices, setSliderServices] = useState([])
  const [locationSearchBox, setLocationSearchBox] = useState()

  useEffect(() => {
    getServices()
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getServices = async () => {
    const resp = await getData("/GetService")
    const filteredServices = resp?.data?.filter((item) => item.service_status == 1)
    setSliderServices(filteredServices)

    try {
      if (typeof window !== 'undefined') {
        const userId = localStorage.getItem("UserId[C]");
        // console.log("userid",userId)
        setUserId(userId)
        // setUser_name(JSON.parse(localStorage.getItem("userName")))
        let data = await getData(`/GetAllUser?id=${userId}`)

        setUser_photo(data?.data[0]?.user_profile_photo)
        setUser_name(data?.data[0]?.name)
        setEmail(data?.data[0]?.email)
      }
    } catch (error) {
      console.log("try-catch error", error)
    }

  }
  // console.log("sliderServices",sliderServices)
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setisSubmitingLoader(true)

  //   if (register_name == '' || register_email == '' || register_phone == '' || register_password == '' || register_city == '' || register_zip == '' || register_locality == '' || register_state == '') {
  //     toast.error("All fields are required!!")
  //   }
  //   else if (register_phone.length < 10) {
  //     toast.error("Please enter 10 digit phone number!!")
  //   }
  //   else if (register_zip.length !== 6) {
  //     toast.error("Please enter 6 digit Zipcode!!")
  //   }
  //   else {

  //     let person = {
  //       "name": register_name,
  //       "email": register_email,
  //       "user_phno": register_phone,
  //       "password": register_password,
  //       "user_locality": register_locality,
  //       "user_city": register_city,
  //       "user_state": register_state,
  //       "user_zipcode": register_zip,
  //       "user_type": "Customer"
  //     };

  //     try {
  //       const resp = await postData("/register", person);
  //       console.log("resp", resp);
  //       if (resp?.status) {
  //         toast.success("Customer Registered Successfully!!");


  //         // setSmShow(false);
  //       }
  //       else {
  //         toast.error(resp?.errors?.email[0]);
  //         console.log("Customer register fail error", resp?.errors);

  //       }



  //     } catch (error) {
  //       console.log("catch Error", error)
  //     }


  //   }
  //   setisSubmitingLoader(false)


  // }

  // const handleLogin = async (e) => {

  //   e.preventDefault();
  //   setisSubmitingLoader(true);
  //   if (email == "" || password == '') {
  //     toast.error("Both fields are required!!")
  //     setisSubmitingLoader(false)
  //   }
  //   else {
  //     const login = {
  //       "email": email,
  //       "password": password

  //     }

  //     try {
  //       const resp = await postData("/login", login);
  //       console.log("resp Login", resp)
  //       if (resp?.success) {
  //         toast.success(resp?.message);


  //         if (typeof window !== 'undefined') {
  //           localStorage.setItem("token", JSON.stringify(resp?.data?.token));
  //           localStorage.setItem("userName", JSON.stringify(resp?.data?.name?.name))
  //         }

  //       }
  //       else {
  //         toast.error(resp?.message);

  //       }
  //     } catch (error) {
  //       console.log("try-catch error", error)
  //     }
  //     setisSubmitingLoader(false);
  //     setSmShow(false);
  //   }
  // }
  const handleLogout = () => {
    setisSubmitingLoader(true)
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("UserId[C]")
        // localStorage.removeItem("userName")
        localStorage.removeItem("Etoken")
      }
      location.reload();
    } catch (error) {
      console.log("try-catch error", error)
    }
    setShow(false)
    setisSubmitingLoader(false)
  }

  const handleSearchServices = (event) => {

    if (event.key === 'Enter') {
      route.push("/service")

    }
  }

  const handleLocationSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const resp = await getData("/GetServiceLocation")
        let value = 0
        resp?.data?.map((item) => {


          if (item.location_name == locationSearchBox || item.zip_code == locationSearchBox) {
            value = 1
          }
        }
        )
        value == 1 ? toast.success("We provide services in this area.") : toast.error("We dont provide services in this area.")
      } catch (error) {
        console.log("try-catch error", error)
      }

    }
  }
  return (
    <>
      <Head>
        <title>Electricity</title>
        <meta name="description" content="Electricity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={` ${inter.className}`}>
        <div>
          {isSubmitingLoader ? (
            <div className="overlay">
              <div className="spinner-container">
                <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
              </div>
            </div>
          ) : null}

          <Toaster position="top-center" richColors />
          <section className={style.header} >
            <nav className={style.nav}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12">
                    {" "}
                    <Link href="#">
                      <Image
                        src="/homepage/logo.png"
                        height={50}
                        width={200}
                        className={style.logo}
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className={`${style.nav_icon} col-xxl-9 col-xl-9 col-lg-9 col-12`}>
                    <Link href="/cart">
                      <FaShoppingCart />
                    </Link>

                    {userId ? (<Link href="#" onClick={() => setSmShow(true)} className="me-2">
                      <FaUser />
                    </Link>) : (<Link href="/login" className="me-2">
                      <FaUser />
                    </Link>)}
                    <Link href="#" onClick={handleShow}>
                      <FaBars />
                    </Link>
                  </div>{" "}
                </div>{" "}
              </div>
            </nav>

            <div className={style.banner_items}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12">
                    <div className={style.banner_text}>
                      <h1>
                        Quality Home Services <span>on Demand.</span>
                      </h1>
                      <p>
                        Experienced,Hand-picked Professionals to serve you at your
                        Doorstep.
                      </p>
                      <div className={style.banner_input}>
                        <div className={style.banner_input1}>
                          {" "}
                          <MdLocationPin />
                          <input type="text" placeholder="Current Locaction" onKeyDown={handleLocationSearch} value={locationSearchBox} onChange={(e) => setLocationSearchBox(e.target.value)} />
                        </div>
                        <div className={style.banner_input2}>
                          {" "}
                          <AiOutlineSearch />
                          <input type="text" placeholder="Search for Services" onKeyDown={handleSearchServices} />
                        </div>
                      </div>
                      <div className={style.banner_text_div}>
                        <h3>
                          <span>25% DISCOUNT</span> ON YOUR FIRST SERVICES{" "}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.banner_slider} col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12`} >
                    <Swiper1 />
                    {/* <div className={style.slider1}> </div> */}
                  </div>{" "}
                </div>
              </div>
            </div>

            <div className="user_model">
              <Modal
                // size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <Image src="/logo.png" height={50} width={200} alt="img" /></Modal.Title>
                </Modal.Header>

                <Modal.Body >
                  {/* <Tabs defaultActiveKey="first" className="d-flex justify-content-around login_tabs">
                <Tab eventKey="first" title="Register" >

                  <Form.Group className="mb-2" >
                    <Form.Label className="mt-2">Name</Form.Label>
                    <Form.Control placeholder="Name" type="text" value={register_name} onChange={(e) => setRegister_name(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Email" type="email" value={register_email} onChange={(e) => setRegister_email(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password" type="password" value={register_password} onChange={(e) => setRegister_password(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2" >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="Phone" type="number" value={register_phone} onChange={(e) => setRegister_phone(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={() => { setVerify("d-block"); toast.error("Phone Need to be varified!!") }}>
                    Verify Phone Number
                  </Button>
                  <div className={`${verify}`}>
                    <hr />
                    <Form.Group className="mb-2" >
                      <Form.Label className="mt-2">OTP</Form.Label>
                      <Form.Control placeholder="OTP" type="text" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleRegister} >
                      Submit
                    </Button>

                  </div>




                </Tab>
                <Tab eventKey="first" title="Register" >
                  <Form>
                    <Row className="mb-2 mt-2">
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" value={register_name} onChange={(e) => setRegister_name(e.target.value)} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={register_email} onChange={(e) => setRegister_email(e.target.value)} />
                      </Form.Group>
                    </Row>
                    <Row className="mb-2 mt-2">
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your name" value={register_password} onChange={(e) => setRegister_password(e.target.value)} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" placeholder="Enter your phone number" value={register_phone} onChange={(e) => setRegister_phone(e.target.value)} />
                      </Form.Group>
                    </Row>



                    <Form.Group className="mb-2" controlId="formGridAddress2">
                      <Form.Label>Address </Form.Label>
                      <Form.Control placeholder="Enter your address" value={register_locality} onChange={(e) => setRegister_locality(e.target.value)} />
                    </Form.Group>

                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="City" value={register_city} onChange={(e) => setRegister_city(e.target.value)} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder="State" value={register_state} onChange={(e) => setRegister_state(e.target.value)} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="number" placeholder="Zipcode" value={register_zip} onChange={(e) => setRegister_zip(e.target.value)} />
                      </Form.Group>
                    </Row>



                    <Button variant="primary" className="mt-2" onClick={() => { setVerify("d-block"); toast.error("Phone Need to be varified!!") }}>
                      Verify phone number!!
                    </Button>
                  </Form>
                  <div className={`${verify}`}>
                    <hr />
                    <Form.Group className="mb-2" >
                      <Form.Label className="mt-2">OTP</Form.Label>
                      <Form.Control placeholder="OTP" type="text" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleRegister} >
                      Submit
                    </Button>

                  </div>




                </Tab>
                <Tab eventKey="second" title="Login">
                  <Form.Group className="mb-2" >
                    <Form.Label className="mt-2">Email</Form.Label>
                    <Form.Control placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-2" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleLogin}>
                    Submit
                  </Button>
                </Tab>

              </Tabs> */}
                  {user_name ? (
                    <>
                      <div>
                        <div className={style.userPhoto}>
                          <img src={user_photo === null ? '/dummy.jpg' : process.env.NEXT_PUBLIC_IMAGE_URL+user_photo} height={50} width={50} />
                        </div>
                        <Table >

                          <tbody>
                            <tr>
                              <td>User Name</td>
                              <td>{user_name}</td>
                            </tr>
                            <tr>
                              <td>User Email</td>
                              <td>{email}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="d-flex justify-content-center">
                          <Button variant="primary" onClick={handleLogout}>
                            LogOut
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-evenly">
                      <Button variant="primary" onClick={() => route.push("/login")}>
                        Login
                      </Button>
                      <Button variant="primary" onClick={() => route.push("/register")}>
                        Register
                      </Button>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </section>
          <section className={style.section2} >
            <div className="container">
              <h1>Quality of Home Services.</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam.
              </p>
              <div className={style.section2_slider} >
                <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  // autoplay={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                  }}
                  delay={5000}
                  modules={[Navigation, Autoplay]}
                  loop={true}
                  navigation={true}
                  breakpoints={{
                    1024: {
                      slidesPerView: 5,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1
                    }

                  }}
                  // Navigation={{ nextE1: '.review-swiper-button-next', prevE1: '.review-swiper-button-prev' }}

                  className="mySwiper sliderbox"
                // style={{
                //     "--swiper-pagination-color": "yellow",
                //     "--swiper-pagination-bullet-inactive-color": "lightyellow",
                //     "--swiper-pagination-bullet-inactive-opacity": "1",
                //     "--swiper-pagination-bullet-size": "10px",
                //     "--swiper-pagination-bullet-horizontal-gap": "6px",
                //     "--swiper-pagination-bullet-border-radius": "0px"
                // }}
                >
                  {sliderServices ? sliderServices?.map((t, index) => (
                    <SwiperSlide className={style.slider2_background} key={index}>
                      <Link href={`/singleService?id=${t?.subscription_id}`}  >
                        <div>
                          <Image
                            src="/homepage/ac.png"
                            height={60}
                            width={60}
                            alt="img"
                          />
                          <span>{t.service_names}</span>
                        </div>
                      </Link>
                    </SwiperSlide>)) : (<SwiperSlide className={style.slider2_background} >
                      <Link href="/singleService?id=54" >
                        <div>
                          <Image
                            src="/homepage/electric.png"
                            height={60}
                            width={60}
                            alt="img"
                          />
                          <span>dummy slide</span>
                        </div>
                      </Link>
                    </SwiperSlide>)}
                  {/* <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/electric.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>Elelctricians</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/ac.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>AC Service</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/invertor.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>Invertor Repair</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/carpainter.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>Carpenters</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/plumber.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>Plumbers</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/electric.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>Elelctricians</span>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={style.slider2_background}>
                <Link href="/acservice" >
                  <div>
                    <Image
                      src="/homepage/ac.png"
                      height={60}
                      width={60}
                      alt="img"
                    />
                    <span>AC Repair</span>
                  </div>
                </Link>
              </SwiperSlide> */}
                </Swiper>

              </div>
            </div>
          </section>
          <section className={style.section3} >
            <div >
              <div className="container-fluid" >
                <div className="row align-items-center" >
                  <div className={`${style.section3_div1} col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12`} >
                    <Image
                      src="/homepage/couple.png"
                      height={766}
                      width={640}
                      alt="img"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    className={`${style.section3_div2} col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12`}
                  >
                    <h1>
                      Sit at Home
                      <br />
                      <span>We Will Take Care</span>
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div>
                      <div>
                        <Link href="#">
                          <Image
                            src="/homepage/fastservice.png"
                            height={70}
                            width={80}
                            alt="img"
                          />
                        </Link>
                        <span>
                          Fast Service
                          <br /> on Time
                        </span>
                      </div>
                      <div>
                        <Link href="#">
                          <Image
                            src="/homepage/helpcenter.png"
                            height={70}
                            width={70}
                            alt="img"
                          />
                        </Link>
                        <span>
                          24/7 <br />
                          Help Center
                        </span>
                      </div>
                      <div>
                        <Link href="#">
                          <Image
                            src="/homepage/widemap.png"
                            height={70}
                            width={70}
                            alt="img"
                          />
                        </Link>
                        <span>
                          Wide
                          <br /> Coverage Map
                        </span>
                      </div>
                      <div>
                        <Link href="#">
                          <Image
                            src="/homepage/employee.png"
                            height={70}
                            width={70}
                            alt="img"
                          />
                        </Link>
                        <span>
                          More Than <br />
                          1500 Employee
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link href="#">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={style.section4} >
            <div className="container">
              <div className="row align-items-center">
                <div className={style.section4_div1} >
                  <div className={style.section4_div1_div1}>
                    <div>
                      <div>
                        <h1>Its Summer Time !</h1>
                        <p>Get 30% Off First 50 Order</p>
                        <div>
                          <Link href="/service">BOOK SERVICES</Link>
                        </div>
                      </div>
                      <div className={style.ac_image}>
                        <Image
                          src="/homepage/Layer_31.png"
                          height={150}
                          width={300}
                          alt="img"
                        />
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
                            <Link href="/service">BOOK SERVICES</Link>
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
                <div className={style.section4_div2}>
                  <div>
                    <h1>Its Winter Time !</h1>
                    <p>Get 30% Off First 50 Order</p>
                    <Image
                      src="/homepage/Layer_33.png"
                      height={300}
                      width={200}
                      alt="img"
                    />
                    <Link href="/service">BOOK SERVICES</Link>
                  </div>
                </div>{" "}
              </div>{" "}
            </div>
          </section>
          <section className={style.section5}>
            <div className="container">
              <div className="row align-items-center">
                <div className={style.section5_div1}>
                  <Image
                    src="/homepage/Layer_38.png"
                    height={700}
                    width={550}
                    alt="img"
                  />
                </div>
                <div className={style.section5_div2}>
                  <h1>Trusted & Popular Services Portal</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div>
                    <div>
                      <div className={style.check_icon_div}>
                        <FiCheck />
                      </div>
                      <div className={style.check_text_div}>
                        <h4 style={{ color: "#1d2022", fontWeight: "600" }}>
                          #1 Quality Job
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={style.check_icon_div}>
                        <FiCheck />
                      </div>
                      <div className={style.check_text_div}>
                        <h4 style={{ color: "#1d2022", fontWeight: "600" }}>
                          Top Companies
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={style.check_icon_div}>
                        <FiCheck />
                      </div>
                      <div className={style.check_text_div}>
                        <h4 style={{ color: "#1d2022", fontWeight: "600" }}>
                          No Extra Charges
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={style.check_icon_div}>
                        <FiCheck />
                      </div>
                      <div className={style.check_text_div}>
                        <h4 style={{ color: "#1d2022", fontWeight: "600" }}>
                          24/7 Help Center
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </section>
          <section className={style.section6}>
            <iframe
              width="100%"
              height="740px"
              src="https://www.youtube.com/embed/D0UnqGm_miA?si=FhxubZNN8DF8AAkT"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            ></iframe>
            {/* <ReactPlayer
          url='https://www.youtube.com/watch?v=9xwazD5SyVg'
          controls={true} height={740} width={"100%"} /> */}
          </section>
          <section className={style.section7}>
            <div className="container">
              <div className="row align-items-center">
                <div>
                  <h1>Good Reviews By Customers</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam
                  </p>
                </div>
                <div className={style.section7_commentsection1}>
                  <div className={style.section7_testmonial}>
                    <h4>"#The best usefull website"</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div>
                      <div>
                        <Image
                          src="/homepage/1.jpg"
                          height={50}
                          width={50}
                          alt="img"
                        />
                      </div>
                      <div>
                        <h4>Lucia E. Nugent</h4>
                        <span>CEO of climber</span>
                        <div>
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.section7_testmonial}>
                    <h4>"Rating is the #1"</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div>
                      <div>
                        {" "}
                        <Image
                          src="/homepage/1.jpg"
                          height={50}
                          width={50}
                          alt="img"
                        />
                      </div>
                      <div>
                        <h4>Brenda R. Smith</h4>
                        <span>Founder of Yeloover</span>
                        <div>
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.section7_testmonial}>
                    <h4>"Rating is the #1"</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div>
                      <div>
                        {" "}
                        <Image
                          src="/homepage/1.jpg"
                          height={50}
                          width={50}
                          alt="img"
                        />
                      </div>
                      <div>
                        <h4>Brenda R. Smith</h4>
                        <span>Founder of Yeloover</span>
                        <div>
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.section7_commentsection2}>
                  <div className={style.section7_testmonial}>
                    <h4>"Rating is the #1"</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div>
                      <div>
                        {" "}
                        <Image
                          src="/homepage/1.jpg"
                          height={50}
                          width={50}
                          alt="img"
                        />
                      </div>
                      <div>
                        <h4>Brenda R. Smith</h4>
                        <span>Founder of Yeloover</span>
                        <div>
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.section7_testmonial}>
                    <h4>"Rating is the #1"</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div>
                      <div>
                        {" "}
                        <Image
                          src="/homepage/1.jpg"
                          height={50}
                          width={50}
                          alt="img"
                        />
                      </div>
                      <div>
                        <h4>Brenda R. Smith</h4>
                        <span>Founder of Yeloover</span>
                        <div>
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar style={{ color: "ff9800" }} />
                          <FaStar />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </section>

          {/* ================================off canvas================================= */}

          <section className={style.sidemenu} >


            <Offcanvas show={show} onHide={handleClose} placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <div className={style.sidemenu_head}>
                    <Link href="#">
                      <Image
                        src="/homepage/logo.png"
                        height={50}
                        width={200}
                        alt="img"
                      />
                    </Link>
                  </div>



                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className={style.sidemenu_nav}>
                  <hr />
                  <ul>
                    <li>
                      <MdKeyboardDoubleArrowRight />
                      <Link href="/">HOME</Link>
                    </li>
                    <li>
                      <MdKeyboardDoubleArrowRight />
                      <Link href="/service">SERVICES</Link>
                    </li>
                    {/* <li>
                  <MdKeyboardDoubleArrowRight />
                  <Link href="/checkout">CHECKOUT</Link>
                </li> */}
                    <li>
                      <MdKeyboardDoubleArrowRight />
                      <Link href="/plan">PLAN</Link>
                    </li>
                    <li>
                      <MdKeyboardDoubleArrowRight />
                      <Link href="/help">HELP</Link>
                    </li>
                    {/* <li>
                  <MdKeyboardDoubleArrowRight />
                  <Link href="/acservice">AC SERVICE</Link>
                </li> */}
                  </ul>
                </div>
                <hr />
                <div className={style.sidemenu_icons}>

                  <Link href="#">
                    <FaFacebookF />
                  </Link>
                  <Link href="#">
                    <AiOutlineDribbble />
                  </Link>
                  <Link href="#">
                    <FaGooglePlusG />
                  </Link>
                  <Link href="#">
                    <FaSkype />
                  </Link>
                  <Link href="#">
                    <FaTwitter />
                  </Link>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </section>


          <Subescribe />

          <MainFooter />
        </div>

      </main>
    </>
  )
}
