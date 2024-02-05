import {
  FaSistrix,
  FaAlignJustify,
  FaArrowsToCircle,
  FaEnvelope,
  FaRegBell,
  FaUserTie,
  FaRegEnvelope,
  FaGear,
  FaCircleQuestion,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { getData, postData } from "@/helpers/services";

import axios from "axios";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

const Header = ({setData}) => {

  const router = useRouter();
  const [sidebarClass, setsidebarClass] = useState("sidenav-toggled");
  const [userID, setUserID] = useState();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [userPhoto, setUserPhoto] = useState('')
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [userPhone, setUserPhone] = useState();
  const [userNewPassword, setUserNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userZip, setUserZip] = useState();
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [refresh, setRefresh] = useState("");
  const [userUpdatedPhoto, setUserUpdatedPhoto] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  // props.data = false;
  useEffect(() => {
    // const user = localStorage.getItem("username");
    // const mail = localStorage.getItem("email");
    // setusername(user);
    // setemail(mail);
    getUser()
  }, [refresh]);

  const getUser = async () => {
    setisSubmitingLoader(true)
    try {
      const userId = localStorage.getItem("UserId[A]")
      setUserID(userId)
      const resp = await getData(`/GetAllUser?id=${userId}`)

      setusername(resp?.data[0]?.name)
      setUserPhoto(resp?.data[0]?.user_profile_photo)
      setemail(resp?.data[0]?.email)
      setUserPhone(resp?.data[0]?.user_phno)
      setUserAddress(resp?.data[0]?.user_locality)
      setUserZip(resp?.data[0].user_zipcode)
      setUserCity(resp?.data[0]?.user_city)
      setUserState(resp?.data[0]?.user_state)
      setUserCountry(resp?.data[0]?.user_country)
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)

  }
  function toggleSidebar() {
    if (sidebarClass == "sidenav-toggled") {
      setsidebarClass("");
      const body = document.querySelector("body");
      body.classList.remove("sidenav-toggled");
    } else {
      setsidebarClass("sidenav-toggled");
      const body = document.querySelector("body");
      body.classList.add("sidenav-toggled");
    }
  }

  const UserUpdate = async () => {
    setisSubmitingLoader(true)

    if (userPhone.toString().length == 10 && userZip.toString().length == 6) {
      try {
        const formData = new FormData();
        formData.append('updId', userID);
        formData.append("name", username);
        formData.append("email", email);
        formData.append("user_phno", userPhone);
        formData.append("user_city", userCity);
        formData.append("user_locality", userAddress);
        formData.append("user_state", userState);
        formData.append("user_zipcode", userZip);
        formData.append("user_profile_photo", userUpdatedPhoto);
        formData.append("user_country", userCountry);
        const resp = await axios.post(process.env.NEXT_PUBLIC_SITE_URL + "/UpdateUser", formData)
        console.log("user update resp", resp)
        resp?.data?.message === "User Updated Successfully" ? toast.success(resp?.data?.message) : toast.error(resp?.data?.message)
      }
      catch (error) {
        console.log("try-catch error", error)
      }
    }
    else {
      toast.error("Please check Phone and Zip code !")
    }


    setRefresh(Math.random())
    setisSubmitingLoader(false)

  }


  function logout() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <>
      {isSubmitingLoader ? (
        <div className="overlay">
          <div className="spinner-container">
            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
          </div>
        </div>
      ) : null}
      {/* model start */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title><Image src="/logo.png" height={50} width={200} alt="img" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Row>
                  <Image src={userPhoto == null ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`} height={200} width={200} alt="img" className="rounded-circle" />
                </Row>
              </div>
              <div className="col-8">
                <Form>

                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" value={username} onChange={(e) => setusername(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} disabled />
                    </Form.Group>



                  </Row>

                  <Form.Group controlId="formFile" className="mb-1">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control type="file" onChange={(e) => setUserUpdatedPhoto(e.target.files[0])} />
                  </Form.Group>

                  <Row>
                    <Form.Group as={Col} controlId="formGridfghPassword">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="number" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                    </Form.Group>

                  </Row>
                  <Row className="mb-1 mt-1">


                    <Form.Group as={Col} controlId="formGriddhEmail">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter new password" value={userNewPassword} onChange={(e) => setUserNewPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridasdrgEmail">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </Form.Group>


                  </Row>

                  <Form.Group className="mb-1" controlId="formGridAddress2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                  </Form.Group>


                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control type="number" value={userZip} onChange={(e) => setUserZip(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridfggCity">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" value={userState} onChange={(e) => setUserState(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGriddfgdCity">
                      <Form.Label>Country</Form.Label>
                      <Form.Control type="text" value={userCountry} onChange={(e) => setUserCountry(e.target.value)} />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={UserUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* model end */}
      <div className="app-header header top-header">
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand" href="/">
              <img
                src="/logo.png"
                className="header-brand-img desktop-logo"
                alt="logo"
              />
            </a>
            <a
              aria-label="Hide Sidebar"
              className={`app-sidebar__toggle sidenav-toggled`}
              data-toggle="sidebar"
              // href="javascript:void(0)"
              onClick={toggleSidebar}

            >
              <FaAlignJustify />
            </a>
            {/* sidebar-toggle*/}
            <form className="form-inline">
              <div className="search-element">
                <input
                  type="search"
                  className="form-control header-search"
                  placeholder="Search…"
                  aria-label="Search"
                  tabIndex={1}
                />
                <button className="btn btn-primary-color" type="submit">
                  <FaSistrix />
                </button>
              </div>
            </form>
            <div className="dropdown  header-setting" >
              <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                <a className="dropdown-item" href="#">
                  {" "}
                  Multi Pages{" "}
                </a>
                <a className="dropdown-item" href="#">
                  {" "}
                  Mail Settings{" "}
                </a>
                <a className="dropdown-item" href="#">
                  {" "}
                  Default Settings{" "}
                </a>
                <a className="dropdown-item" href="#">
                  {" "}
                  Documentation{" "}
                </a>
                <div className=" text-center p-2 border-top mt-3">
                  <a href="#" className="">
                    updated
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex order-lg-2 ml-auto">
              <a
                href="#"
                data-toggle="search"
                className="nav-link nav-link-lg d-md-none navsearch"
              >
                <i className="fa fa-search" />
              </a>
              <div className="dropdown   header-fullscreen">
                <a
                  className="nav-link icon full-screen-link"
                  id="fullscreen-button"
                >
                  <FaArrowsToCircle />
                </a>
              </div>
              <div className="dropdown header-notify">
                <a className="nav-link icon text-center" data-toggle="dropdown">
                  <FaEnvelope />
                  <span className="nav-unread bg-danger pulse" />
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow w-300  pt-0">
                  <div className="dropdown-header mt-0 pt-0 border-bottom p-4">
                    <h5 className="dropdown-title mb-1 font-weight-semibold text-drak">
                      Messages
                    </h5>
                    <p className="dropdown-title-text subtext mb-0 pb-0 ">
                      You have 4 unread messages
                    </p>
                  </div>
                  <a href="#" className="dropdown-item d-flex pb-4 pt-4">
                    <div
                      className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                      data-image-src="assets/images/5.jpg"
                      style={{
                        background: 'url("/5.jpg") center center',
                      }}
                    >
                      <span className="avatar-status bg-green" />
                    </div>
                    <div>
                      <small className="dropdown-text">Madeleine</small>
                      <p className="mb-0 fs-13 text-muted">
                        Hey! there I' am available
                      </p>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex pb-4 pt-4">
                    <div
                      className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                      data-image-src="/3.jpg"
                      style={{
                        background: 'url("/3.jpg") center center',
                      }}
                    >
                      <span className="avatar-status bg-red" />
                    </div>
                    <div>
                      <small className="dropdown-text">Anthony</small>
                      <p className="mb-0 fs-13 text-muted ">
                        New product Launching
                      </p>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex pb-4 pt-4">
                    <div
                      className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                      data-image-src="/3.jpg"
                      style={{
                        background: 'url("/3.jpg") center center',
                      }}
                    >
                      <span className="avatar-status bg-yellow" />
                    </div>
                    <div>
                      <small className="dropdown-text">Olivia</small>
                      <p className="mb-0 fs-13 text-muted">
                        New Schedule Realease
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider mt-0" />
                  <a href="#" className="dropdown-item text-center">
                    See all Messages
                  </a>
                </div>
              </div>
              {/* MESSAGE-BOX */}
              <div className="dropdown d-md-flex message">
                <a className="nav-link icon" data-toggle="dropdown">
                  <FaRegBell />
                  <span className=" bg-success pulse-success " />
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow pt-0">
                  <div className="dropdown-header border-bottom p-4 pt-0 mb-3 w-270">
                    <div className="d-flex">
                      <h5 className="dropdown-title float-left mb-1 font-weight-semibold text-drak">
                        Notifications
                      </h5>
                      <a
                        href="#"
                        className="fe fe-align-justify text-right float-right ml-auto text-muted"
                      />
                    </div>
                  </div>
                  <a href="#" className="dropdown-item d-flex pb-2 pt-2">
                    <div className="card box-shadow-0 mb-0">
                      <div className="card-body p-3">
                        <div className="notifyimg bg-gradient-primary border-radius-4">
                          <i className="mdi mdi-email-outline" />
                        </div>
                        <div>
                          <div>Message Sent.</div>
                          <div className="small text-muted">3 hours ago</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex  pb-2">
                    <div className="card box-shadow-0 mb-0 ">
                      <div className="card-body p-3">
                        <div className="notifyimg bg-gradient-danger border-radius-4 bg-danger">
                          <i className="fe fe-shopping-cart" />
                        </div>
                        <div>
                          <div> Order Placed</div>
                          <div className="small text-muted">5 hour ago</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex pb-2">
                    <div className="card box-shadow-0 mb-0">
                      <div className="card-body p-3">
                        <div className="notifyimg bg-gradient-success  border-radius-4 bg-success mr-2">
                          <i className="fe fe-airplay" />
                        </div>
                        <div>
                          <div>Your Admin launched</div>
                          <div className="small text-muted">1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className=" text-center p-2 border-top mt-3">
                    <a href="#" className="">
                      View All Notifications
                    </a>
                  </div>
                </div>
              </div>
              <div className="dropdown ">
                <a
                  className="nav-link pr-0 leading-none"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profile-details mt-2">
                    <span className="mr-3 font-weight-semibold">
                      {username}
                    </span>
                    <small className="text-muted mr-3">Admin</small>
                  </div>
                  <Image
                    className="avatar avatar-md brround"
                    src={userPhoto == null || userPhoto==undefined ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`}
                    alt="image"
                    width={50}
                    height={50}
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow w-250" >
                  <div className="user-profile border-bottom p-3">
                    <div className="user-image">
                      <img className="user-images" style={{ mixHeight: "65" }} src={userPhoto == null ||userPhoto==undefined? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`} alt="image" />
                    </div>
                    <div className="user-details">
                      <h4>{username}</h4>
                      <p className="mb-1 fs-13 text-muted">{email}</p>
                    </div>
                  </div>
                  <a href="#" className="dropdown-item pt-3 pb-3" onClick={handleShow}>
                    <FaUserTie /> My Profile{" "}
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaRegEnvelope /> Messages{" "}
                    <span className="badge badge-pill badge-success">41</span>
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaGear /> Settings{" "}
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaCircleQuestion /> FAQ{" "}
                  </a>
                  <span className="dropdown-item pt-3 pb-3" onClick={logout} style={{ cursor: "pointer" }}>
                    <FaArrowRightToBracket />
                    Sign Out{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
