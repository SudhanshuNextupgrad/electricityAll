import Link from "next/link";
import Head from 'next/head';
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { verifyIsLoggedIn, getFormatedDate } from "@/helpers/helper";

import { deleteData, getData, postData } from "@/helpers/services";
import { Toaster, toast } from "sonner";
import { AiFillStar } from "react-icons/ai";
import AdminLayout from "@/layouts/AdminLayout";

const Employeelist = () => {

  const [employeeList, setemployeeList] = useState([]);
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [NewEmployeeName, setNewEmployeeName] = useState('');
  const [NewEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [NewEmployeePhone, setNewEmployeePhone] = useState();
  const [NewEmployeePassword, setNewEmployeePassword] = useState('');
  const [refresh, setRefresh] = useState('')

  const router = useRouter();
  useEffect(() => {
    verifyIsLoggedIn(router);
    getEmployeeList();
  }, [refresh]);

  //function to get the list of all employees
  async function getEmployeeList() {
    try {
      setisSubmitingLoader(true);
      const result = await getData("/GetAllUser");
      if (result.status) {
        // console.log("Employee List", result);
        setisSubmitingLoader(false);
        const employees = result.data.filter(
          (item) => item.user_type == "Employee"
        );
        setemployeeList(employees);
      } else {
        setisSubmitingLoader(false);
        toast.error("Cannot get Employee List.");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  const RegisterEmployee = async () => {
    setisSubmitingLoader(true)
    if(NewEmployeePhone.toString().length==10)
    { 
      try {
      const NewEmployee = {
        "name": NewEmployeeName,
        "email": NewEmployeeEmail,
        "password": NewEmployeePassword,
        "user_phno": NewEmployeePhone,
        "user_type": "Employee"
      }

      const resp = await postData("/register", NewEmployee)
      // console.log("resp",resp)
      resp?.message == "User Created Successfully" ? toast.success(resp?.message) : toast.error(resp?.message);
      setRefresh(Math.random)
    } catch (error) {
      console.log("try-catch error", error)
    }
   
  }
  else{
    toast.error("Phone no must be of 10 digits !")
  }
   
    setisSubmitingLoader(false)
  }
  const deleteEmployee = async (id) => {
    setisSubmitingLoader(true)
    try {
      const resp = await deleteData("/DeleteUser", { "delId": id })
      // console.log("delete user",resp)
      resp?.message == "User Deleted Successfully" ? toast.success(resp?.message) : toast.error(resp?.messsage)
      setRefresh(Math.random)
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
    // console.log("userid",id)
  }

  return (
    <AdminLayout>
      <Head>
        <title>Employee's List</title>
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
                <h4 className="page-title">List of Employee</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    List of Employee
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>

            <div className="row" >
              <div className="col-xl-12 col-lg-12 col-md-12" >
                <div className="card" >
                  <div className="card-body" >
                    <h5><b>Add Employee:</b></h5>
                    <div className="form-group m-0" >
                      <div className="row gutters-xs">
                        <div className="col-12 col-sm-6 col-lg-3 mt-1">
                          <input
                            type="search"
                            className="form-control header-search"
                            placeholder="Name.."
                            aria-label="Search"
                            tabIndex={1}
                            value={NewEmployeeName}
                            onChange={(e) => setNewEmployeeName(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 mt-1">
                          <input
                            type="email"
                            className="form-control header-search"
                            placeholder="Email ID"
                            value={NewEmployeeEmail}
                            onChange={(e) => setNewEmployeeEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-sm-4 mt-sm-1 col-lg-3 mt-1">
                          {/* <select className="form-control custom-select">
                          <option value="">Services</option>
                          <option value="Services1">Services 1</option>
                          <option value="Services2">Services 2</option>
                        </select> */}
                          <input
                            type="number"
                            className="form-control header-search"
                            placeholder="Phone"
                            pattern="[0-9]{10}"
                            value={NewEmployeePhone}
                            onChange={(e) => setNewEmployeePhone(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-sm-4 mt-sm-1 col-lg-2 mt-1">
                          {/* <select className="form-control custom-select">
                          <option value="">Rating</option>
                          <option value="Rating1">Rating 1</option>
                          <option value="Rating2">Rating 2</option>
                        </select> */}
                          <input
                            type="password"
                            className="form-control header-search"
                            placeholder="Password"
                            value={NewEmployeePassword}
                            onChange={(e) => setNewEmployeePassword(e.target.value)}
                          />
                        </div>
                        <div className="col-1 col-sm-4 mt-sm-1 col-lg-1 mt-1">
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary" onClick={RegisterEmployee}>
                              Create
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {/* <table className="table table-bordered  border-top table-hover  mb-0 text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Campaign</th>
                <th>Client</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mails</td>
                <td><Link   href="/employee-detail">Ryan MacLeod</Link></td>
                <td>$12k</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Total Pageviews</td>
                <td>Jacob Sutherland</td>
                <td>$16k</td>
                <td>
                  <span className="badge badge-primary">Running</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Total Visits</td>
                <td>James Oliver</td>
                <td>$14k</td>
                <td>
                  <span className="badge badge-warning">Active</span>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Total Clicks</td>
                <td>Lisa Nash</td>
                <td>$19k</td>
                <td>
                  <span className="badge badge-danger">Active</span>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Total Requests</td>
                <td>Alan Walsh</td>
                <td>$21k</td>
                <td>
                  <span className="badge badge-primary">Hold</span>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Network Traffic</td>
                <td>Pippa Mills</td>
                <td>$14k</td>
                <td>
                  <span className="badge badge-warning">Hold</span>
                </td>
              </tr>
            </tbody>
          </table> */}
                      <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                        <thead className="bg-primary text-white">
                          <tr>
                          <th className="text-white">Sr.No.</th>
                            <th className="text-white">Employee Name</th>
                            <th className="text-white">Email</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Phone</th>
                            {/* <th className="text-white">Rating</th> */}
                            <th className="text-white">Country</th>
                            <th className="text-white">Address</th>
                            <th className="text-white">Zip</th>
                            <th className="text-white"> Date Created</th>
                            <th className="text-white"> Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeeList.length > 0
                            ? employeeList.map((item, index) => (
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                  {/* <Link
                                    href="/employee-detail"
                                    className="text-inherit"
                                  >
                                    Untrammelled prevents{" "}
                                  </Link> */}
                                  {item.name}
                                </td>
                                <td>{item.email}</td>
                                <td>
                                  {item.user_status == "1" ? (
                                    <>
                                      <span className="status-icon bg-success" />
                                      active
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <span className="status-icon bg-danger" />
                                      inactive
                                    </>
                                  )}
                                </td>
                                <td>{item.user_phno}</td>
                                {/* <td>
                                  {item.user_rating ? (
                                    <>
                                      {item.user_rating} <span> </span>
                                      <AiFillStar className="star" />{" "}
                                    </>
                                  ) : null}
                                </td> */}
                                <td>{item.user_country}</td>
                                <td>{item.user_city}</td>
                                <td>{item.user_zipcode}</td>
                                <td>
                                  {getFormatedDate(
                                    item.created_at,
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                <td className="text-center"><FaTrashAlt onClick={() => deleteEmployee(item.id)} style={{cursor:"pointer"}}/></td>
                              </tr>
                            ))
                            : null}
                        </tbody>
                      </table>
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
};

export default Employeelist;
