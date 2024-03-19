import Link from 'next/link';
import Head from 'next/head';
import { FaTrashAlt } from "react-icons/fa";
import { deleteData, getData, putData } from '@/helpers/services';
import { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";

import { getFormatedDate, verifyIsLoggedIn } from '@/helpers/helper';
import AdminLayout from '@/layouts/AdminLayout';
import { useRouter } from 'next/router';


const Ticket = () => {

  const route = useRouter();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [ticketList, setTickedList] = useState('');
  const [allServices, setAllServices] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [EmployeeAllotedId, setEmployeeAllotedId] = useState();
  const [updateEmployee, setUpdateEmployee] = useState('')
  const [Refresh, setRefresh] = useState('')


  useEffect(() => {
    getTicket();
    verifyIsLoggedIn(route)
  }, [Refresh]);

  const getTicket = async () => {
    setisSubmitingLoader(true)
    try {
      const resp = await getData("/GetSupportTicket")
      // console.log("ticket details", resp)
      setTickedList(resp?.data);

      const resp2 = await getData("/GetService")
      // console.log("All Services", resp2)
      setAllServices(resp2?.data)

      const resp3 = await getData("/GetAllUser")
      // console.log("All User", resp3)
      setAllUser(resp3?.data)
      const allEmp = resp3?.data?.filter((e) => e.user_type == "Employee")
      setAllEmployee(allEmp)
      // console.log("allEmp", allEmp)



    } catch (error) {
      console.log("try-catch error", error)
    }

    setisSubmitingLoader(false)
  }

  const handleAllotment = async (customerId, ticketId, SpptStatus) => {
    setisSubmitingLoader(true)
    try {
      if (EmployeeAllotedId == undefined) {
        toast.error("Please select valid employee")
      }
      else {
        const updateTicketDetails = {
          "customer_id": customerId,
          "support_status": SpptStatus,
          "emp_id": parseInt(EmployeeAllotedId),
          "updId": ticketId
        }
        console.log("update details", updateTicketDetails)

        const resp = await putData("/UpdateSupportTicket", updateTicketDetails)
        console.log('resp', resp)
        resp?.message === "Ticket Updated Successfully" ? toast.success(resp?.message) : toast.error(resp?.message)




        // console.log("update details", customerId, ticketId, SpptStatus)
        // console.log("Employee alloted id", EmployeeAllotedId)
        setRefresh(Math.random())
        setEmployeeAllotedId();


      }



    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }
 
  const deleteTicket = async(id)=>{
    // console.log("ticket id ",id)
    setisSubmitingLoader(true)
    try {
      const resp = await deleteData("/DeleteSupportTicket",{"delId":id})
      // console.log("resp",resp)
      resp?.message=="Ticket Deleted Successfully"? toast.success(resp?.message):toast.error(resp?.message)
      setRefresh(Math.random)
    } catch (error) {
      console.log("try-catch error",error)
    }
    setisSubmitingLoader(false)
  }
  return (
    <AdminLayout>
      <Head>
        <title>Tickets</title>
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
        <div className="app-content">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Ticket</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Ticket
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"><div className="tab-menu-heading">
                {/* <div className="tabs-menu ">
             
              <ul className="nav panel-tabs">
                <li className="">
                  <a href="#tab1" className="active" data-toggle="tab">
                  Previous Ticket
                  </a>
                </li>
                <li>
                  <a href="#tab2" data-toggle="tab" className="">
                  Pending
                  </a>
                </li>
                <li>
                  <Link href="#tab3" data-toggle="tab" className="">
                  Done
                  </Link>
                </li>
               
              </ul>
            </div> */}
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
                                    <th className="text-white">Ticket ID</th>
                                    <th className="text-white">Service Booked ID</th>
                                    <th className="text-white">Service Name</th>
                                    <th className="text-white">Ticket Date</th>
                                    <th className="text-white">Ticket Description</th>
                                    <th className="text-white">Customer Name and ID</th>
                                    <th className="text-white">Customer Address</th>
                                    <th className="text-white">Customer Phone</th>
                                    <th className="text-white">Assigned to</th>
                                    <th className="text-white">Ticket Status</th>
                                    <th className="text-white">Action</th>
                                    <th className="text-white">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ticketList ? ticketList.map((item, index) => (
                                    <tr key={index}>
                                      {/* {console.log("item",item)} */}
                                      <th scope="row">{item.id}</th>
                                      <td>{item.unique_service_id}</td>
                                      <td>{allServices.map((i) => i.subscription_id == item.service_id ? i.service_names : "")}</td>
                                      <td>{getFormatedDate(item.created_at, "DD-MM-YYYY")}</td>
                                      <td className='cellOverlap'>{item.issue_desc}</td>
                                      <td>{allUser.map((u) => u.id == item.customer_id ? u.name : '')}</td>
                                      <td>{allUser.map((u) => u.id == item.customer_id ? u.user_locality + " " + u.user_city + " " + u.user_state + " " + u.user_country : '')}</td>
                                      <td>{allUser.map((u) => u.id == item.customer_id ? u.user_phno : '')}</td>
                                      <td>
                                        <select className="form-control" tabIndex={-1} aria-hidden="true" value={item.emp_id} onChange={(e) => { setEmployeeAllotedId(e.target.value); item.emp_id = e.target.value }}>
                                          <option value="--">--</option>
                                          {
                                            allEmployee.map((item, index) => (
                                              <option value={`${item.id}`} key={index}>{item.name} [id:  {item.id}]</option>
                                            ))
                                          }

                                        </select>
                                      </td>
                                      <td  >
                                        <span className={item.support_status == 0 ? "unpaid" : "paid done"}>{item.support_status == 0 ? <>Pending</> : <>Done</>}</span>
                                      </td>
                                      <td>
                                        {item.support_status == 0 ? (<Link className="actionsubmit" href="#" onClick={() => handleAllotment(item.customer_id, item.id, item.support_status)}>Submit</Link>) : (<Link className="actionsubmit" href="#" onClick={() => toast.error("Ticket is completed!")}>Submit</Link>)}

                                      </td>
                                      <td className="text-center"><FaTrashAlt onClick={()=>deleteTicket(item.id)} style={{cursor:"pointer"}}/></td>
                                    </tr>
                                  )) : null}

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
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Name</th>
                                    <th className="text-white">Services</th>
                                    <th className="text-white">Email ID</th>
                                    <th className="text-white">Address</th>
                                    <th className="text-white">Zip Code</th>
                                    <th className="text-white">Date</th>
                                    <th className="text-white">Time</th>
                                    <th className="text-white">Payment</th>
                                    <th className="text-white">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
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
                          </div>
                          <div className="tab-pane" id="tab3">
                            <div className="table-responsive">
                              <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                                <thead className="bg-primary text-white">
                                  <tr>
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Name</th>
                                    <th className="text-white">Services</th>
                                    <th className="text-white">Email ID</th>
                                    <th className="text-white">Address</th>
                                    <th className="text-white">Zip Code</th>
                                    <th className="text-white">Date</th>
                                    <th className="text-white">Time</th>
                                    <th className="text-white">Payment</th>
                                    <th className="text-white">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
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
    </AdminLayout>
  );
}

export default Ticket;