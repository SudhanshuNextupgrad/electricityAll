import { FaSistrix, FaAlignJustify, FaArrowsToCircle, FaEnvelope, FaRegBell, FaUserTie, FaRegEnvelope, FaGear, FaCircleQuestion, FaArrowRightToBracket } from "react-icons/fa6";
import { useState, useEffect } from "react";

import { getData } from "@/helpers/services";
import { useRouter } from "next/navigation";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Toaster, toast } from "sonner";

const Header = () => {

  const route = useRouter()

  const [sidebarClass, setsidebarClass] = useState("sidenav-toggled");
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("")
  const [userId, setUserId] = useState()
  // const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhoto, setUserPhoto] = useState('')
  const [userPhone, setUserPhone] = useState()
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPasswordConfirm, setUserNewPasswordConfirm] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userZip, setUserZip] = useState()
  const [userCity, setUserCity] = useState('')
  const [userState, setUserState] = useState('')
  const [userCountry, setUserCountry] = useState('')
  const [userUpdatedPhoto, setUserUpdatedPhoto] = useState('')
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [refresh, setRefresh] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUser();
  }, [refresh]);

  const getUser = async () => {
    try {
      if (typeof window !== 'undefined') {
        const EmpId = localStorage.getItem("UserId[E]");
        setUserId(EmpId);

        console.log("EmpId", EmpId);
        const resp = await getData(`/GetAllUser?id=${EmpId}`)
        console.log("All users", resp);
        setUserName(resp?.data[0]?.name);
        // setUserRole(resp.data[0].user_type);
        setUserEmail(resp?.data[0]?.email);
        setUserPhoto(resp?.data[0]?.user_profile_photo);
        setUserPhone(resp?.data[0]?.user_phno);
        setUserNewPassword();
        setUserNewPasswordConfirm();
        setUserAddress(resp?.data[0]?.user_locality);
        setUserZip(resp?.data[0]?.user_zipcode);
        setUserCity(resp?.data[0]?.user_city);
        setUserState(resp?.data[0]?.user_state);
        setUserCountry(resp?.data[0]?.user_country);



      }
    } catch (error) {
      console.log("try-catch error", error)
    }

  }

  const Logout = () => {

    localStorage.clear()
    route.push("/")

  }

  function toggleSidebar() {

    if (sidebarClass == "sidenav-toggled") {
      setsidebarClass("")
      const body = document.querySelector('body')
      body.classList.remove("sidenav-toggled");
    } else {
      setsidebarClass("sidenav-toggled")
      const body = document.querySelector('body')
      body.classList.add("sidenav-toggled");

    }

  }

  const userUpdate = async () => {

    setisSubmitingLoader(true)
    try {


      console.log("username", username)
      console.log("useremail", userEmail)
      console.log("profile photo", userPhoto)
      console.log("user phone", userPhone)
      console.log("user address", userAddress)
      console.log("user zip", userZip)
      console.log("user city", userCity)
      console.log("user state", userState)
      console.log("user country", userCountry)

      // if (userPhone.length == 10 || userPhone.length == undefined && userZip.length == 6 || userZip.length == undefined) {




      // }
      // else {
      //   toast.error("Please check Phone no and Zipcode.")
      // }

      if (userPhone?.toString()?.length != 10) {
        toast.error("Phone number should be of 10 digits !")
      }
      else if (userZip == null) {
        toast.error("Zip code is required !")
      }
      else if (userZip?.toString()?.length != 6) {
        toast.error("Zip code should be of 6 digits !")
      }
      else if (userAddress == null) {
        toast.error("Address is required !")
      }
      else if (userCity == null) {
        toast.error("City is required !")
      }
      else if (userState == null) {
        toast.error("State is required !")
      }
      else if (userCountry == null) {
        toast.error("Country is required !")
      }
      else {

        const formData = new FormData();
        formData.append('updId', userId);
        formData.append("name", username);
        formData.append("email", userEmail);
        formData.append("user_phno", userPhone);
        formData.append("user_city", userCity);
        formData.append("user_locality", userAddress);
        formData.append("user_state", userState);
        formData.append("user_zipcode", userZip);
        formData.append("user_profile_photo", userUpdatedPhoto);
        formData.append("user_country", userCountry);

        // console.log("formData", formData)
        const resp = await axios.post(process.env.NEXT_PUBLIC_SITE_URL + "/UpdateUser", formData)
        console.log("user update resp", resp)
        resp?.data?.message === "User Updated Successfully" ? toast.success(resp?.data?.message) : toast.error(resp?.data?.message)


        setTimeout(() => location.reload(), 1500)
      }



    } catch (error) {
      console.log('try-catch error', error)
    }

    setisSubmitingLoader(false)

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
      <Toaster position="top-center" richColors />
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
                  <Image src={userPhoto == null || userPhoto == undefined ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`} height={200} width={200} alt="img" className="rounded-circle" />
                  {/* <img  src="/1.jpg"/> */}
                </Row>
              </div>
              <div className="col-8">
                <Form>

                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail" >
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} disabled />
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
                      <Form.Control type="password" placeholder="Confirm new password" value={userNewPasswordConfirm} onChange={(e) => setUserNewPasswordConfirm(e.target.value)} />
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
          <Button variant="success" onClick={userUpdate}>
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
              className={`app-sidebar__toggle`}
              data-toggle="sidebar"
              href="javascript:void(0)"
              onClick={toggleSidebar}
            ><FaAlignJustify /></a>
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
            <div className="dropdown  header-setting">
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
                <a className="nav-link icon full-screen-link" id="fullscreen-button">
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
                        background: 'url("/5.jpg") center center'
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
                        background: 'url("/3.jpg") center center'
                      }}
                    >
                      <span className="avatar-status bg-red" />
                    </div>
                    <div>
                      <small className="dropdown-text">Anthony</small>
                      <p className="mb-0 fs-13 text-muted ">New product Launching</p>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex pb-4 pt-4">
                    <div
                      className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                      data-image-src="/3.jpg"
                      style={{
                        background: 'url("/3.jpg") center center'
                      }}
                    >
                      <span className="avatar-status bg-yellow" />
                    </div>
                    <div>
                      <small className="dropdown-text">Olivia</small>
                      <p className="mb-0 fs-13 text-muted">New Schedule Realease</p>
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
                          <div className="small text-muted">1 daya ago</div>
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
                    <span className="mr-3 font-weight-semibold">{username}</span>
                    <small className="text-muted mr-3">Employee</small>
                  </div>
                  <img
                    className="avatar avatar-md brround"
                    src={userPhoto == null || userPhoto == undefined ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`}
                    alt="image"
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow w-250">
                  <div className="user-profile border-bottom p-3">
                    <div className="user-image">
                      <img
                        className="user-images"
                        src={userPhoto == null || userPhoto == undefined ? "/dummy.jpg" : process.env.NEXT_PUBLIC_IMAGE_URL + `${userPhoto}`}
                        alt="image"
                      />
                    </div>
                    <div className="user-details">
                      <h4>{username}</h4>
                      <p className="mb-1 fs-13 text-muted">{userEmail}</p>
                    </div>
                  </div>
                  <a href="#" className="dropdown-item pt-3 pb-3" onClick={handleShow}>
                    <FaUserTie />{" "}
                    My Profile{" "}
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaRegEnvelope />{" "}
                    Messages{" "}
                    <span className="badge badge-pill badge-success">41</span>
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaGear />{" "}
                    Setting{" "}
                  </a>
                  <a href="#" className="dropdown-item pt-3 pb-3">
                    <FaCircleQuestion />{" "}
                    FAQ{" "}
                  </a>
                  <a href="/" className="dropdown-item pt-3 pb-3" onClick={() => Logout()}>
                    <FaArrowRightToBracket />
                    Sign Out{" "}
                  </a>
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
