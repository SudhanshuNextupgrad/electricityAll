import Link from "next/link";
import Head from 'next/head';
import { TbAirConditioningDisabled, TbWood } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import { MdPlumbing, MdElectricalServices } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { verifyIsLoggedIn } from "@/helpers/helper";

import { getData, postData, deleteData, putData } from "@/helpers/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminLayout from "@/layouts/AdminLayout";


const detailsservices = () => {
  const router = useRouter();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDetail, setServiceDetail] = useState("");
  const [Services, setServices] = useState([]);
  const [locations, setlocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [SubServices, setSubServices] = useState([]);
  const [selectedSubServices, setselectedSubServices] = useState([]);
  const [Service_cost, setService_cost] = useState('')
  // const [updatedService, setUpdatedService] = useState({})
  const [service_name_update, setService_name_update] = useState('')
  const [service_cost_update, setService_cost_update] = useState('')
  const [service_des_update, setService_des_update] = useState('')
  const [service_update_id, setService_update_id] = useState()
  const [sub_service_update, set_seb_service_update] = useState([])
  const [sub_service_update_id, setSub_service_update_id] = useState([])
  const [refresh, setRefresh] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
    console.log("id", id)
    const resp = await getData(`/GetOneService?id=${id}`)
    console.log("GetOneService", resp)
    // setUpdatedService(resp.data[0])
    setService_cost_update(resp.data[0].service_cost)
    setService_name_update(resp.data[0].service_names)
    setService_des_update(resp.data[0].service_des)
    setService_update_id(resp.data[0].subscription_id)
    set_seb_service_update(resp.data[0].subsc_lists)
  }


  useEffect(() => {
    verifyIsLoggedIn(router);
    getServices();
    getLocation();
    getSubService();
  }, [refresh]);


  //function to post service
  async function saveService(event) {
    event.preventDefault();
    if (selectedSubServices.length > 0) {
      try {
        const arrayOfLocationID = [];
        const arrayofSubServiceID = [];
        selectedLocations.forEach((item) => arrayOfLocationID.push(item.id));
        selectedSubServices.forEach((item) =>
          arrayofSubServiceID.push(item.id)
        );
        console.log("arrayofLocationId", arrayOfLocationID);
        console.log("arrayofSubServiceId", arrayofSubServiceID);

        setisSubmitingLoader(true);
        const result = await postData("/StoreService", {
          service_name: serviceName,
          service_des: serviceDetail,
          service_des_id: arrayofSubServiceID,
          location: arrayOfLocationID,
          service_cost: Service_cost
        });
        console.log("result", result);
        if (result.status) {
          setisSubmitingLoader(false);

          setServiceName("");
          setServiceDetail("");
          setService_cost("")
          setselectedSubServices([]);
          setSelectedLocations([]);
          toast.success("Service Saved.");
          getServices();
        } else {
          setisSubmitingLoader(false);
          toast.error("Service Not Saved.");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
      }
    } else {
      toast.warning("Please select a location and Service");
    }
  }

  //get services
  async function getServices() {
    try {
      setisSubmitingLoader(true);
      const result = await getData("/GetService");
      if (result?.status) {
        // console.log("===>", result);
        setisSubmitingLoader(false);
        const filteredServices = result?.data?.filter((item) => item.service_status == 1)
        setServices(filteredServices);
      } else {
        setisSubmitingLoader(false);
        toast.error("Faied to load Services");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  }
  //function to get locations
  async function getLocation() {
    try {
      const result = await getData("/GetServiceLocation");
      if (result?.status) {
        // console.log("==>", result);
        const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        const sortedList = [...result?.data].sort((a, b) =>
          collator.compare(a.location_name, b.location_name)
        );

        // Assuming setSubServices is a state update function
        setlocations(sortedList);
      } else {
        toast.error("Failed to get Locations");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLocationChange = (location) => {
    const isSelected = selectedLocations.includes(location);

    if (isSelected) {
      setSelectedLocations((prevSelected) =>
        prevSelected.filter((selected) => selected !== location)
      );
    } else {
      setSelectedLocations((prevSelected) => [...prevSelected, location]);
    }
  };
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
  const handleLocationSubmit = (e) => {
    e?.preventDefault();
    // Add your form submission logic here using selectedLocations
    console.log(selectedLocations);
  };
  const handleSubserviceSubmit = (e) => {
    e?.preventDefault();
    // Add your form submission logic here using selectedLocations
    console.log(selectedSubServices);
  };
  async function getSubService() {
    try {
      const result = await getData("/GetSubscriptionDetails");
     
      if (result?.status) {

        const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        let sortedList = [...result?.data].sort((a, b) =>
          collator.compare(a.subsc_list, b.subsc_list)
        );

        // Assuming setSubServices is a state update function
        sortedList = sortedList.filter((item) => item.subsc_status == "1")
        setSubServices(sortedList);
      } else {
        toast.error("Failed to get Sub-services");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const SubServiceUpdate = async (update) => {  
    // console.log("update", update)
    // console.log("existing list", sub_service_update)

    if (!sub_service_update.includes(update)) {
      sub_service_update.push(update)
    }
    else {
      const index = sub_service_update.indexOf(update);
      if (index > -1) { // only splice array when item is found
        sub_service_update.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    // console.log("updated services list", sub_service_update)

    const resp = await getData("/GetSubscriptionDetails")
    // console.log("Sub service list",resp.data)
    // const sub_service_update_id = [];
    resp?.data?.map((item) => {
      if (sub_service_update.includes(item.subsc_list)) {
        if (!sub_service_update_id.includes(item.id)) {
          sub_service_update_id.push(item.id)
        }
      }
    })
    console.log("sub_service_update_id", sub_service_update_id)
    setRefresh(Math.random())

  }
  const updateService = async () => {
    setisSubmitingLoader(true)
    try {
      const updated_data = {
        "updId": service_update_id,
        "service_name": service_name_update,
        "service_cost": parseInt(service_cost_update),
        "service_des": service_des_update,
        "service_des_id": sub_service_update_id//array of id will submitted
      }
      console.log("updated data", updated_data)
      const resp = await putData("/UpdateService", updated_data)

      resp?.message === "Service Updated Successfully" ? toast.success(resp?.message) : toast.error(resp?.message)
      setRefresh(Math.random())
    } catch (error) {
      console.log("try-catch error", error)
    }
    handleClose()
    setisSubmitingLoader(false)
  }

  const deleteService = async (item) => {
    setisSubmitingLoader(true)
    // console.log("item",item)
    const resp = await deleteData("/DeleteService", { "delId": item })
    // console.log("delete resp", resp)
    resp?.message === "Service Deleted Successfully" ? toast.success(resp?.message) : toast.error(resp?.message)
    setisSubmitingLoader(false)
    // location.reload();
    setRefresh(Math.random())
  }

  return (
    <AdminLayout>
      <Head>
        <title>Services</title>
      </Head>
      <>

        {isSubmitingLoader ? (
          <div className="overlay">
            <div className="spinner-container">
              <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
            </div>
          </div>
        ) : null}
        <Toaster position="top-center" richColors />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Update Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Service Name</Form.Label>
                <Form.Control type="email" value={service_name_update} onChange={(e) => setService_name_update(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Service Cost</Form.Label>
                <Form.Control type="text" value={service_cost_update} onChange={(e => setService_cost_update(e.target.value))} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Service Description</Form.Label>
                <Form.Control type="text" value={service_des_update} onChange={(e) => setService_des_update(e.target.value)} />
              </Form.Group>
              <Row className="mb-3">
                <Col sm={10}>
                  <Form.Group className="mb-3 " id="formGridCheckbox">
                    {SubServices.map((item, index) => (
                      <Form.Check type="checkbox" label={item.subsc_list} key={index} checked={sub_service_update.includes(item.subsc_list) ? true : false} onChange={(e) => SubServiceUpdate(item.subsc_list)} />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={() => updateService()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="app-content">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Details of Services</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Details of Services
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card">

                  <div className="card-body">
                    <h4>Create Service :</h4>
                    <div className="form-group m-0">
                      <form className="row gutters-xs" onSubmit={saveService}>
                        {/* <div className="col-3">
                        <input
                          type="search"
                          className="form-control header-search"
                          placeholder="Services Name"
                          aria-label="Search"
                          tabIndex={1}
                        />
                      </div> */}
                        <div className="col-sm-3 mt-1">
                          <input
                            type="text"
                            value={serviceName}
                            className="form-control header-search"
                            placeholder="Service Name"
                            required={true}
                            onChange={(e) => setServiceName(e?.target?.value)}
                          />
                        </div>
                        <div className="col-sm-3 mt-1">
                          <input
                            type="text"
                            value={serviceDetail}
                            className="form-control header-search"
                            placeholder="Service Details"
                            required={true}
                            onChange={(e) => setServiceDetail(e?.target?.value)}
                          />
                        </div>
                        <div className="col-sm-3 mt-1">
                          <input
                            type="text"
                            className="form-control header-search"
                            placeholder="Services Cost"
                            onChange={(e) => setService_cost(e.target.value)}
                            value={Service_cost}
                          />
                        </div>
                        <div className="col-sm-2 mt-1">
                          <div className="text-end  searchsexction">
                            <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
                              Submit
                            </button>

                            {/* <button type="submit" className="btn btn-danger">
                            Delete
                          </button> */}
                          </div>
                        </div>
                      </form>
                      <div className="parent_Loc_Service">
                        {/* <div className="sec1">
                        <h4>Locations</h4>
                        {locations.length > 0 ? (
                          <Form
                            className="locationsList"
                            onSubmit={handleLocationSubmit}
                          >
                            {locations.map((location, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`locationCheckbox-${location.id}`}
                                label={location.location_name}
                                checked={selectedLocations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                              />
                            ))}

                            
                          </Form>
                        ) : null}
                      </div> */}
                        <div className="sec2">
                          <h4 className="mt-2">Select Sub-Service :</h4>
                          {SubServices.length > 0 ? (
                            <Form
                              className="locationsList d-flex row"
                              onSubmit={handleSubserviceSubmit}
                            >
                              {SubServices.map((location, index) => (
                                <Form.Check
                                  key={index}
                                  type="checkbox"
                                  id={`locationCheckbox-${location.id}`}
                                  label={location.subsc_list}
                                  checked={selectedSubServices.includes(location)}

                                  onChange={() =>
                                    handleSubServiceChange(location)
                                  }
                                />
                              ))}

                              {/* <Button variant="primary" type="submit">
                              Submit
                            </Button> */}
                            </Form>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {Services.length > 0 ? (
                <>
                  {Services?.map((item, index) => (
                    <div key={index} className="col-md-6 col-lg-3 features">
                      <div className="card">
                        <div className="card-body text-center">
                          <div className="feature">
                            <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                              <TbAirConditioningDisabled />
                            </div>
                            <h3>{item.service_names}</h3>
                            <h4><b>${item.service_cost}</b></h4>
                            <p><b>{item.service_des}</b></p>

                            <ul style={{ padding: "0px", display: "grid" }}>
                              {/* {console.log("asdf",item.subsc_lists)} */}
                              {item.subsc_lists.map((subItem, index) => (
                                // {console.log("subItem",subItem)}
                                <li key={index}>{subItem}</li>
                              ))}
                              {/* <li>Proin et dui imperdiet.</li>
                            <li>Proin at magna posuere.</li>
                            <li>Proin hendrerit magna.</li>
                            <li>Donec consequat quam.</li> */}
                            </ul>
                          </div>
                          <div className="pricingTable2-sign-up">
                            <a href="#" className="btn btn-block btn-success" onClick={() => handleShow(item.subscription_id)}>
                              Edit
                            </a>
                            <a href="#" className="btn btn-block btn-danger mt-4" onClick={() => deleteService(item.subscription_id)}>
                              Delete
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="noServiceMsg">
                    No services to show. Please create one.
                  </div>
                </>
              )}

              {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
              {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
              {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
              {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                      <TbAirConditioningDisabled />
                    </div>
                    <h3>AC Repair</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                      <TbAirConditioningDisabled />
                    </div>
                    <h3>AC Repair</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </>
    </AdminLayout>
  );
};

export default detailsservices;
