import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { deleteData, getData, putData } from '@/helpers/services';
import { Toaster, toast } from "sonner";
import { getFormatedDate } from '@/helpers/helper';
import EmployeeLayout from '@/layouts/EmployeeLayout';

const Ticket = () => {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [allTickets, setAllTickets] = useState([])
  const [allUser, setAllUser] = useState([])
  const [refresh, setRefresh] = useState('')


  useEffect(() => {
    getTicket()
    getCustomerDetails()
  }, [refresh]);

  const getCustomerDetails = async () => {
    setisSubmitingLoader(true)
    try {
      const resp = await getData("/GetAllUser")
      setAllUser(resp.data)
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }

  const getTicket = async () => {
    setisSubmitingLoader(true)
    try {
      if (typeof window !== 'undefined') {
        const EmpId = localStorage.getItem("UserId[E]")
        // console.log("EmpId",EmpId)
        const resp = await getData("/GetSupportTicket")
        console.log("get ticket resp", resp)
        const filtered_tickets = resp.data.filter((item) => item.emp_id == EmpId)
        console.log("filtered_tickets", filtered_tickets)
        setAllTickets(filtered_tickets)
        // const filtered_customerId=[]
        //  filtered_tickets.map((item) => {
        //   if(!filtered_customerId.includes(item.customer_id)){
        //     filtered_customerId.push(item.customer_id)
        //   }})

        // getCustomerDetails(filtered_customerId)


      }
    }
    catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }

  const TicketComplete = async (updateId, customerId) => {


    setisSubmitingLoader(true)

    try {
      const updateDetails = {
        "updId": updateId,
        "customer_id": customerId,
        "support_status": "1"
      }
      const resp = await putData("/UpdateSupportTicket", updateDetails)

      resp.message === "Ticket Updated Successfully" ? toast.success(resp.message) : toast.error(resp.message)
      // setTimeout(()=>location.reload(),2000)
      setRefresh(Math.random())
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }

  const deleteTicket = async(id)=>{
    setisSubmitingLoader(true)
    try {
      console.log("id",id)
      const resp  = await deleteData("/DeleteSupportTicket",{"delId":id})
      console.log("delete resp",resp)
      resp?.message=="Ticket Deleted Successfully"? toast.success(resp?.message) : toast.error(resp?.message)
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
                <div className="tabs-menu ">
                  {/* <ul className="nav panel-tabs">
                  <li className="">
                    <a href="#tab1" className="active" data-toggle="tab">
                      Previous Ticket
                    </a>
                  </li>
                  <li>
                    <a href="#tab2" data-toggle="tab" className="">
                      Today Ticket
                    </a>
                  </li>
                  <li>
                    <Link href="#tab3" data-toggle="tab" className="">
                      Upcoming Ticket
                    </Link>
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
                                    <th className="text-white">Sr.No.</th>
                                    <th className="text-white">Ticket ID</th>
                                    <th className="text-white">Ticket Date</th>
                                    <th className="text-white">Unique ID</th>
                                    <th className="text-white">Service ID</th>
                                    <th className="text-white">Ticket Description</th>
                                    <th className="text-white">Customer ID</th>
                                    <th className="text-white">Customer Phone</th>
                                    <th className="text-white">Customer Address</th>
                                    <th className="text-white">Status</th>
                                    <th className="text-white">Action</th>
                                    <th className="text-white">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {allTickets ? allTickets.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index +1}</td>
                                      <th scope="row">{item.id}</th>
                                      <td>{getFormatedDate(item.created_at, "DD-MM-YYYY")}</td>
                                      <td>{item.unique_service_id}</td>
                                      <td>{item.service_id}</td>
                                      <td className='cellOverlap'>{item.issue_desc}</td>
                                      <td>{item.customer_id}</td>
                                      <td>{allUser.map((user) => user.id == item.customer_id ? user.user_phno : '')}</td>
                                      <td>{allUser.map((user) => user.id == item.customer_id ? user.user_locality + " " + user.user_city + " " + user.user_state + " " + user.user_country : '')}</td>
                                      <td>
                                        {item.support_status == 0 ? (<span className="unpaid">Pending</span>) : (<span className="paid done">Done</span>)}
                                      </td>
                                      <td>
                                        {item.support_status == 0 ? (<Link className="actionsubmit" href="#" onClick={() => TicketComplete(item.id, item.customer_id)}>Submit</Link>) : (<Link className="actionsubmit" href="#" onClick={() => toast.error("Ticket Completed.")}>Submit</Link>)}


                                      </td>
                                      <td><FaTrashAlt onClick={()=>deleteTicket(item.id)}/></td>
                                    </tr>)) : <>No Services</>}

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
                                  <th className="text-white">Service ID 2</th>
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
                                  <th className="text-white">Service ID 3</th>
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
    </EmployeeLayout>
  );
}

export default Ticket;