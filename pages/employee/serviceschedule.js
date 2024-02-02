
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { deleteData, getData, putData } from '@/helpers/services';
import { Toaster, toast } from "sonner";
import EmployeeLayout from '@/layouts/EmployeeLayout';
import { getFormatedDate } from '@/helpers/helper';


const Serviceschedule = () => {

  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  // const [PreviousServices, setPreviousServices] = useState([]);
  // const [TodayServices, setTodayServices] = useState([]);
  // const [upcomingServices, setUpcomingServices] = useState([]);
  const [BookedServices, setBookedServices] = useState([])
  const [AllUsers, setAllUsers] = useState([]);
  const [refresh, setRefresh] = useState('');
  // const [EmpId, setEmpId] = useState()

  useEffect(() => {
    getServices()
    getAllUser()
  }, [refresh]);

  const getAllUser = async () => {
    try {
      const resp = await getData("/GetAllUser")
      console.log("all user resp", resp)
      setAllUsers(resp?.data)
    } catch (error) {
      console.log("try-catch error", error)
    }
  }

  const getServices = async () => {
    setisSubmitingLoader(true)
    try {
      if (typeof window !== 'undefined') {
        const EmpId = localStorage.getItem("UserId[E]")
        const resp = await getData("/GetServiceBooking")
        console.log("all booked services",resp)
        const EmpServices = resp?.data?.filter((item) => item.emp_id == EmpId)
        console.log("EmpServices",EmpServices)
        setBookedServices(EmpServices)
        // const date = new Date();
        // const today = getFormatedDate(date, "DD-MM-YYYY")
        // console.log("today", today)
        // const todayServics = [];
        // const upcomingServices = []
        // const pastServices = [];
        // EmpServices.map((item) => {


        //   if (getFormatedDate(item.service_avail_date, "DD-MM-YYYY") == today) {

        //     todayServics.push(item)
        //   }
        //   else if (getFormatedDate(item.service_avail_date, "DD-MM-YYYY") > today) {

        //     upcomingServices.push(item)
        //   }
        //   else {

        //     pastServices.push(item)
        //   }
        //   setPreviousServices(pastServices)
        //   setTodayServices(todayServics)
        //   setUpcomingServices(upcomingServices)
        //   console.log("pastServices",pastServices)
        //   console.log("todayServics",todayServics)
        //   console.log("upcomingServices",upcomingServices)
        // }
        // )
      }
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }

  const ServiceComplete = async (updateId) => {
    setisSubmitingLoader(true)
    try {

      const ServiceCompleteDetails = {
        "updId": updateId,
        "status": "1"
      }
      const resp = await putData("/UpdateServiceBooking", ServiceCompleteDetails)
      resp.message === "Service Updated Successfully" ? toast.success(resp.message) : toast.error(resp.message)
    } catch (error) {
      console.log("try-catch error", error)
    }
    // setTimeout(()=>location.reload(),2000)
    setRefresh(Math.random())
    setisSubmitingLoader(false)
  }

const delete_booked_service = async(id)=>{
  console.log("delete id",id)
  // /DeleteServiceBooking
  setisSubmitingLoader(true)
  try {
    const resp = await deleteData("/DeleteServiceBooking",{ "delId":id})
    console.log("delete resp",resp)
    resp?.message=="Service Deleted Successfully"? toast.success(resp?.message):toast.error(resp?.message)
    setRefresh(Math.random)
    
  } catch (error) {
    console.log("try-catch error",error)
  }
  setisSubmitingLoader(false)
}


  return (
    <EmployeeLayout>
      <>
        {isSubmitingLoader ? (
          <div className="overlay">
            <div className="spinner-container">
              <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
            </div>
          </div>
        ) : null}
        <Toaster position="top-center" richColors />
        <div className="app-content">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Service Schedule</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Service Schedule
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"><div className="tab-menu-heading">
                <div className="tabs-menu ">

                  {/* <ul className="nav panel-tabs">
                    <li className="">
                      <a href="#tab1" className="active" data-toggle="tab">
                        Previous Services
                      </a>
                    </li>
                    <li>
                      <a href="#tab2" data-toggle="tab" className="">
                        Today Services
                      </a>
                    </li>
                    <li>
                      <a href="#tab3" data-toggle="tab" className="">
                        Upcoming Services
                      </a>
                    </li>

                  </ul> */}
                </div>
              </div>
                <div className="card">
                  <div className="card-body-tab">
                    <div className="panel panel-primary">

                      <div className="panel-body tabs-menu-body">
                        <div className="tab-content">
                          <div className="tab-pane active" id="tab1">
                            <div className="table-responsive">
                              <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                                <thead className="bg-primary text-white">
                                  <tr>
                                    <th className="text-white">Sr.No. </th>
                                    <th className="text-white">Unique Service ID </th>
                                    <th className="text-white">Service Name</th>
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Service Avail Date</th>
                                    <th className="text-white">Service Cost</th>
                                    <th className="text-white">Service Quantity</th>
                                    <th className="text-white">Customer ID</th>
                                    <th className="text-white">Customer Phone</th>
                                    <th className="text-white">Customer Address</th>
                                    <th className="text-white">Service Book Date</th>
                                    <th className="text-white">Status</th>
                                    <th className="text-white">Action</th>
                                    <th className="text-white">delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {BookedServices?.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index+1}</td>
                                      <th scope="row">{item.unique_service_id}</th>
                                      <td>{item.service_name}</td>
                                      <td>{item.service_id}</td>
                                      <td>{getFormatedDate(item.service_avail_date, "DD-MM-YYYY")}</td>
                                      <td>{item.service_cost}</td>
                                      <td>{item.qty}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.name : '')} [ ID :{item.customer_id}]</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_phno : '')}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_locality + " " + user.user_city + " " + user.user_state + " " + user.user_country : '')}</td>

                                      <td>{getFormatedDate(item.created_at, "DD-MM-YYYY")}</td>
                                      <td>
                                        {item.status == 0 ? (<span className="unpaid">Pending</span>) : (<span className="paid done">Done</span>)}
                                      </td>
                                      <td>
                                        {item.status == 0 ? (<Link className="actionsubmit" href="#" onClick={() => ServiceComplete(item.id)}>Submit</Link>) : (<Link className="actionsubmit" href="#" onClick={() => toast.error("Service is completed.")} >Submit</Link>)}

                                      </td>
                                      <td><FaTrashAlt onClick={()=>delete_booked_service(item.id)}/></td>
                                    </tr>))}
                                  {/* <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr> */}
                                  {/* <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>
                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* <div className="tab-pane" id="tab2">
                            <div className="table-responsive">
                              <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                                <thead className="bg-primary text-white">
                                  <tr>
                                  <th className="text-white">Sr.No. </th>
                                    <th className="text-white">Unique Service ID </th>
                                    <th className="text-white">Service Name</th>
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Service Avail Date</th>
                                    <th className="text-white">Service Cost</th>
                                    <th className="text-white">Service Quantity</th>
                                    <th className="text-white">Customer ID</th>
                                    <th className="text-white">Customer Phone</th>
                                    <th className="text-white">Customer Address</th>
                                    <th className="text-white">Service Book Date</th>
                                    <th className="text-white">Status</th>
                                    <th className="text-white">Action</th>
                                    <th className="text-white">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {TodayServices ? TodayServices.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index+1}</td>
                                      <th scope="row">{item.unique_service_id}</th>
                                      <td>{item.service_name}</td>
                                      <td>{item.service_id}</td>
                                      <td>{item.service_avail_date}</td>
                                      <td>{item.service_cost}</td>
                                      <td>{item.qty}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.name : '')} [ ID :{item.customer_id}]</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_phno : '')}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_house_num + " " + user.user_locality + " " + user.user_landmark + " " + user.user_city + " " + user.user_state : '')}</td>
                                      <td>{item.created_at}</td>
                                      <td>
                                        {item.status == 0 ? (<span className="unpaid">Pending</span>) : (<span className="paid done">Done</span>)}
                                      </td>
                                      <td>
                                        {item.status == 0 ? (<Link className="actionsubmit" href="#" onClick={() => ServiceComplete(item.id)}>Submit</Link>) : (<Link className="actionsubmit" href="#" onClick={() => toast.error("Service is completed.")} >Submit</Link>)}

                                      </td>
                                      <td><FaTrashAlt/></td>
                                    </tr>)) : <>No Services</>}
                                  <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="tab-pane" id="tab3">
                            <div className="table-responsive">
                              <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                                <thead className="bg-primary text-white">
                                  <tr>
                                  <th className="text-white">Sr.No.</th>
                                    <th className="text-white">Unique Service ID</th>
                                    <th className="text-white">Service Name</th>
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Service Avail Date</th>
                                    <th className="text-white">Service Cost</th>
                                    <th className="text-white">Service Quantity</th>
                                    <th className="text-white">Customer ID</th>
                                    <th className="text-white">Customer Phone</th>
                                    <th className="text-white">Customer Address</th>
                                    <th className="text-white">Service Book Date</th>
                                    <th className="text-white">Status</th>
                                    <th className="text-white">Action</th>
                                    <th className="text-white">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {upcomingServices ? upcomingServices.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <th scope="row">{item.unique_service_id}</th>
                                      <td>{item.service_name}</td>
                                      <td>{item.service_id}</td>
                                      <td>{item.service_avail_date}</td>
                                      <td>{item.service_cost}</td>
                                      <td>{item.qty}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.name : '')} [ ID :{item.customer_id}]</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_phno : '')}</td>
                                      <td>{AllUsers.map((user) => user.id == item.customer_id ? user.user_locality + " " + user.user_city + " " + user.user_state + " " + user.user_country : '')}</td>
                                      <td>{item.created_at}</td>
                                      <td>
                                        {item.status == 0 ? (<span className="unpaid">Pending</span>) : (<span className="paid done">Done</span>)}
                                      </td>
                                      <td>
                                        {item.status == 0 ? (<Link className="actionsubmit" href="#" onClick={() => ServiceComplete(item.id)}>Submit</Link>) : (<Link className="actionsubmit" href="#" onClick={() => toast.error("Service is completed.")} >Submit</Link>)}

                                      </td>
                                      <td><FaTrashAlt/></td>
                                    </tr>)) : <>No Services</>}
                                  <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                  <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>


                                  <td>
                                    <span className="unpaid">Unpaid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Ser123</th>
                                  <td>Joan Powell</td>
                                  <td>AC Repair</td>
                                  <td>Joan@gmail.com</td>
                                  <td>Los Angeles</td>
                                  <td>56584</td>
                                  <td>18 Oct 2023</td>
                                  <td>10:00AM</td>

                                  <td>
                                    <span className="paid">Paid</span>
                                  </td>
                                  <td>
                                    <Link className="actionsubmit" href="#">Submit</Link>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div> */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>



      </>
    </EmployeeLayout>
  );
}

export default Serviceschedule;