import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { verifyIsLoggedIn } from "@/helpers/helper";
import { postData, getData, deleteData, putData } from "@/helpers/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AdminLayout from "@/layouts/AdminLayout";


const Subscription = () => {

  const router = useRouter();

  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [serviceName, setserviceName] = useState("");
  const [serviceDescription, setserviceDescription] = useState("");
  const [amount, setamount] = useState("");
  const [subService, setsubService] = useState("");
  const [subServiceDesc, setsubServiceDesc] = useState("");
  const [subserviceAmount, setsubserviceAmount] = useState("");
  const [Services, setServices] = useState([]);
  const [allplans, setAllPlans] = useState([])
  const [selectedSubServices, setselectedSubServices] = useState([]);
  const [trackBtn, settrackBtn] = useState("");
  const [trackId, settrackId] = useState("");
  const [updateButton, setUpdateButton] = useState(0)
  const [updatePlanId, setUpdatePlanId] = useState('')
  const [newPlanName, setNewPlanName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newAmmount, setNewAmmount] = useState('')
  const [newPlanServices, setNewPlanServices] = useState([])
  const [refresh, setRefresh] = useState('')
  //bootstrap modal states------


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (update_id) => {

    setShow(true);
    // console.log("id", update_id);
    console.log("all plans", allplans);
    const selectedPlan = allplans.filter((item) => item.id == update_id)
    console.log("selectedPlan", selectedPlan);
    setNewPlanName(selectedPlan[0].subscription_name)
    setNewDescription(selectedPlan[0].subscription_description)
    setNewAmmount(selectedPlan[0].subscription_amt)
    setNewPlanServices(selectedPlan[0].service_name)
    setUpdatePlanId(selectedPlan[0].id)

  }
  // const handleClose = () => {
  //   settrackBtn("");
  //   settrackId("");
  //   setsubService("");
  //   setsubServiceDesc("");
  //   setsubserviceAmount("");
  //   setShow(false);
  // };

  // const handleShow = (buttonText, id) => {
  //   settrackId(id);
  //   settrackBtn(buttonText);
  //   setShow(true);
  // };
  useEffect(() => {
    verifyIsLoggedIn(router);
    getPlans();
    getService()
  }, [refresh]);

  //function to post service
  async function handleServiceSave(event) {
    event.preventDefault();
    try {
      if (serviceName != "" && serviceDescription != "" && amount != "") {
        if (selectedSubServices.length > 0) {
          const arrayofId = [];
          selectedSubServices.forEach((item) =>
            arrayofId.push(item.subscription_id)
          );

          setisSubmitingLoader(true);
          const result = await postData("/StoreSubscription", {
            subscription_name: serviceName,
            subscription_description: serviceDescription,
            subscription_amt: amount,
            service_id_array: arrayofId,
          });
          console.log("post plan object",)
          if (result.status) {
            getPlans();
            setisSubmitingLoader(false);
            toast.success("Subscription Added");
            setserviceDescription("");
            setserviceName("");
            setamount("");
            setselectedSubServices('')
          }
        } else {
          setisSubmitingLoader(false);
          toast.error("Please select atleast one service");
        }
      } else {
        setisSubmitingLoader(false);
        toast.warning("All the fields are required.");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      console.log(err);
    }
  }

  //api to get the subscription data
  async function getPlans() {
    try {
      const result = await getData("/GetSubscription");
      console.log("get plans", result)
      setAllPlans(result.data ? result.data : [])
      // if (result?.status) {
      //   setservices(result?.data);
      // } else {
      //   toast.error("Failed to get services.");
      // }
    } catch (err) {
      console.log("try-catch error", err);
    }
  }

  //function to delete service
  // async function deleteService() {
  //   // handleClose();

  //   try {
  //     setisSubmitingLoader(true);
  //     const result = await deleteData("/DeleteSubscription", {
  //       delId: trackId,
  //     });
  //     if (result.status) {
  //       getPlans();
  //       setisSubmitingLoader(false);
  //       toast.success("Plan Deleted");

  //       settrackId("");
  //       settrackBtn("");
  //     } else {
  //       setisSubmitingLoader(false);
  //       toast.success("Plan Not Deleted");
  //     }
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // }

  const deletePlan = async (e) => {
    setisSubmitingLoader(true)
    const resp = await deleteData("/DeleteSubscription", { "delId": e })
    console.log("delete resp", resp)
    resp.message === "Subscription Deleted Successfully" ? toast.success(resp.message) : toast.error(resp.message)
    setRefresh(Math.random())
    setisSubmitingLoader(false)
  }
  // const showPlanValues_update = (update_id) => {
  //   setisSubmitingLoader(true)
  //   try {

  //     const singleplan = allplans.filter((item) => item.id == update_id)
  //     console.log("singleplan", singleplan)
  //     setserviceName(singleplan[0].subscription_name)
  //     setserviceDescription(singleplan[0].subscription_description)
  //     setamount(singleplan[0].subscription_amt)
  //     setUpdatePlanId(singleplan[0].id)

  //   } catch (error) {
  //     console.log("try-catch error", error)
  //   }


  //   setisSubmitingLoader(false)
  // }
  const updatePlan = async () => {
    setisSubmitingLoader(true)
    try {
      if (newPlanName === "" || newDescription === "" || newAmmount === '') {
        toast.error("Please fill valid details!!")
      }
      else {
        const resp2 = await getData("/GetService")
        // console.log("all services",resp2.data)
        const newPlanServicesId = [];
        resp2.data.map((item) => {
          if (newPlanServices.includes(item.service_names)) {
            newPlanServicesId.push(item.subscription_id)
          }
        })
        console.log("updatePlanId", updatePlanId)
        const update_plan = {
          "updId": updatePlanId,
          "subscription_name": newPlanName,
          "subscription_description": newDescription,
          "subscription_amt": newAmmount,
          "service_id_array": newPlanServicesId
        }
        console.log("updated plan details", update_plan)
        const resp = await putData("/UpdateSubscription", update_plan)
        console.log("update resp", resp)
        resp.message === "Subscription Updated Successfully" ? toast.success(resp.message) : toast.error(resp.message)

        setNewPlanName('')
        setNewDescription('')
        setNewAmmount('')




        setRefresh(Math.random())
      }
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
    setShow(false)
  }
  //function to save sub service
  async function saveSubService() {
    // handleClose();
    try {
      setisSubmitingLoader(true);
      const result = await postData("/StoreSubscriptionDetails", {
        subsc_id: trackId,
        subsc_list: subServiceDesc,
        subsc_amt: subserviceAmount,
      });
      if (result.status) {
        getPlans();
        setisSubmitingLoader(false);
        toast.success("Service Added in Plan");
        settrackId("");
        settrackBtn("");
        setsubService("");
        setsubServiceDesc("");
        setsubserviceAmount("");
      } else {
        setisSubmitingLoader(false);
        toast.error("Service not added");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  // function to get subService
  async function getService() {
    try {
      const result = await getData("/GetService");

      setServices(result.data)
      if (result.status) {
        // console.log("==>", result);
        // const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        // const sortedList = [...result.data].sort((a, b) =>
        //   collator.compare(a.subsc_list, b.subsc_list)
        // );
        setisSubmitingLoader(false);
        // setSubServices(result.data);

        // Assuming setSubServices is a state update function
        // setSubServices(sortedList);
      } else {
        toast.error("Failed to get Sub-services");
      }
    } catch (err) {
      console.log(err);
    }
  }
  // async function getServices() {
  //   try {
  //     setisSubmitingLoader(true);
  //     const result = await getData("/GetService");
  //     if (result.status) {
  //       console.log("===>", result);
  //       setisSubmitingLoader(false);
  //       setSubServices(result.data);
  //     } else {
  //       setisSubmitingLoader(false);
  //       toast.error("Faied to load Services");
  //     }
  //   } catch (err) {
  //     setisSubmitingLoader(false);
  //     toast.error(err);
  //   }
  // }
  const handleSubServiceChange = (service) => {
    const isSelected = selectedSubServices.includes(service);

    if (isSelected) {
      setselectedSubServices((prevSelected) =>
        prevSelected.filter((selected) => selected !== service)
      );

    } else {
      setselectedSubServices((prevSelected) => [...prevSelected, service]);

    }
  };
  const updateRadioButtons = (newupdate) => {
    // console.log("new update", newupdate)
    // console.log("existing services list", newPlanServices)
    if (!newPlanServices.includes(newupdate)) {

      newPlanServices.push(newupdate)
    }

    else {
      const index = newPlanServices.indexOf(newupdate);
      if (index > -1) { // only splice array when item is found
        newPlanServices.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    // console.log("updated services list", newPlanServices)
    setRefresh(Math.random())
  }

  return (
    <AdminLayout>
      <>
        {isSubmitingLoader ? (
          <div className="overlay">
            <div className="spinner-container">
              <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
            </div>
          </div>
        ) : null}
        {/* <>
        {trackBtn == "add" ? (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Services to your plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  value={subService}
                  placeholder="Service Name"
                  type="text"
                  onChange={(e) => setsubService(e?.target?.value)}
                />
                <input
                  value={subServiceDesc}
                  placeholder="Service Description"
                  type="text"
                  onChange={(e) => setsubServiceDesc(e?.target?.value)}
                />
                <input
                  value={subserviceAmount}
                  placeholder="Service Description"
                  type="number"
                  onChange={(e) => setsubserviceAmount(e?.target?.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveSubService}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : trackBtn == "update" ? (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Pan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you are reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to delete a plan , Are you sure!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={deleteService}>
                  Delete Plan
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </> */}
        <Toaster position="top-center" richColors />
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Update Subscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Subscription Name</Form.Label>
                  <Form.Control type="text" value={newPlanName} required={true} onChange={(e) => setNewPlanName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} value={newDescription} required={true} onChange={(e) => setNewDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Subscription Ammount</Form.Label>
                  <Form.Control type="number" value={newAmmount} required={true} onChange={(e) => setNewAmmount(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="formGridCheckbox">

                  {Services.map((item, index) => (
                    <Form.Check type="checkbox" label={item.service_names} key={index} onChange={(e) => updateRadioButtons(item.service_names)} checked={newPlanServices.includes(item.service_names) ? true : false} />
                  ))}

                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={updatePlan}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="app-content">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Subscription</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Subscription
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>
            {/*custom form piyush start */}
            <div className="card">
              <div className="card-body">
                <h4>Create Plan :</h4>
                <div className="container">
                  <div className="d-flex  mt-2 mb-2">
                    <form className="d-flex">
                      <input
                        value={serviceName}
                        className="mx-1 form-control"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setserviceName(e?.target?.value)}
                        required={true}
                      />
                      <input
                        value={serviceDescription}
                        className="mx-1 form-control"
                        type="text"
                        placeholder="Description"
                        onChange={(e) => setserviceDescription(e?.target?.value)}
                        required={true}
                      />
                      <input
                        value={amount}
                        className="mx-1 form-control"
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => setamount(e?.target?.value)}
                        required={true}
                      />
                      <button onClick={handleServiceSave} className="btn btn-primary w-25">Save</button>

                    </form>
                  </div>
                </div>
                <div className="subServicediv">
                  <h4 className="mt-3">Select Service :</h4>

                  {Services.length > 0 ? (
                    <Form className="locationsList d-flex">
                      {Services.map((location, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          id={`locationCheckbox-${location.subscription_id}`}
                          label={location.service_names}
                          checked={selectedSubServices.includes(location)}
                          onChange={() => handleSubServiceChange(location)}
                        />

                      ))}
                    </Form>

                  ) : null}
                </div>
              </div>
            </div>


            {allplans.length < 4 ? ('') : (<h4 className="text-danger mt-3"><b>* Please add only 3 Plans...</b></h4>)}

            <div className="row">

              {allplans ?
                allplans.map((item, index) => (
                  <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6" key={index}>
                    <div className="pricingTable2 info card"> 
                      <div className="pricingTable2-header">
                        <h3>{item.subscription_name}</h3>
                        <span>{item.subscription_description}</span>
                      </div>
                      <div className="pricing-plans">
                        <span className="price-value1">
                          <i className="fa fa-usd" />
                          <span>{item.subscription_amt}</span>
                        </span>
                        <span className="month">/month</span>
                      </div>
                      <div className="pricingContent2">
                        <ul>
                          {item.service_name.map((item2, index) => (
                            <li key={index}>
                              {item2}
                            </li>
                          ))}

                          {/* <li>
                      <b>8</b> One-Click Apps
                    </li>
                    <li>
                      <b>5</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li> */}
                        </ul>
                      </div>

                      <div className="pricingTable2-sign-up">
                        <a href="#" className="btn btn-block btn-success" onClick={() => handleShow(item.id)}>
                          Edit
                        </a>
                        <a href="#" className="btn btn-block btn-danger mt-4" onClick={() => deletePlan(item.id)}>
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>)) :
                null}

              {/* <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
              <div className="pricingTable2 info card">
                <div className="pricingTable2-header">
                  <h3>Gold</h3>
                  <span>Lorem ipsum dolor</span>
                </div>
                <div className="pricing-plans">
                  <span className="price-value1">
                    <i className="fa fa-usd" />
                    <span>78</span>
                  </span>
                  <span className="month">/month</span>
                </div>
                <div className="pricingContent2">
                  <ul>
                    <li>
                      <b>7 Free </b> Domain Name
                    </li>
                    <li>
                      <b>12</b> One-Click Apps
                    </li>
                    <li>
                      <b>8</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li>
                  </ul>
                </div>

                <div className="pricingTable2-sign-up">
                  <a href="#" className="btn btn-block btn-secondary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
              <div className="pricingTable2 primary card">
                <div className="pricingTable2-header">
                  <h3>Free</h3>
                  <span>Lorem ipsum dolor</span>
                </div>
                <div className="pricing-plans">
                  <span className="price-value1">
                    <i className="fa fa-usd" />
                    <span>99</span>
                  </span>
                  <span className="month">/month</span>
                </div>
                <div className="pricingContent2">
                  <ul>
                    <li>
                      <b>2 Free </b> Domain Name
                    </li>
                    <li>
                      <b>5</b> One-Click Apps
                    </li>
                    <li>
                      <b>1</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li>
                  </ul>
                </div>

                <div className="pricingTable2-sign-up">
                  <a href="#" className="btn btn-block btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div> */}
            </div>
            {/* <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="text-white">Project Name</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                          <th className="text-white">Project Name</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link
                              href="/employee-detail"
                              className="text-inherit"
                            >
                              Untrammelled prevents{" "}
                            </Link>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </>
    </AdminLayout>
  );
};

export default Subscription;
