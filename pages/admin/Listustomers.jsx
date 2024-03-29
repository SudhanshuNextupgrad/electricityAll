import Link from 'next/link';
import Head from 'next/head';
import { FaStar } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

import { deleteData, getData } from '@/helpers/services';
import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';

import { Toaster, toast } from "sonner";
import { verifyIsLoggedIn } from '@/helpers/helper';
import { useRouter } from 'next/router';

const Listustomers = () => {

  const route = useRouter();
  const [totalCustomers, setTotalCustomers] = useState('');
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    getCustomer();
    verifyIsLoggedIn(route)
  }, [refresh]);

  const getCustomer = async () => {
    setisSubmitingLoader(true)
    const resp = await getData("/GetAllUser")


    const filterCustomer = resp?.data?.filter((e) => e.user_type == "Customer")

    setTotalCustomers(filterCustomer)
    setisSubmitingLoader(false)
  }

  const deleteCustomer = async (id) => {

    setisSubmitingLoader(true)
    try {
      const resp = await deleteData("/DeleteUser", { "delId": id })
      console.log("delete resp", resp)
      resp?.message == "User Deleted Successfully" ? toast.success(resp?.message) : toast.error(resp?.message)
      setRefresh(Math.random)

    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }
  return (
    <AdminLayout>
      <>
        <Head>
          <title>Customer's List</title>
        </Head>
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
                <h4 className="page-title">List of Customers</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    List of Users
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
                    <div className="table-responsive">
                      <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th className="text-white">Sr.no.</th>
                            <th className="text-white">User ID</th>
                            <th className="text-white">User Name</th>
                            <th className="text-white">Location</th>
                            <th className="text-white">Zip Code</th>
                            <th className="text-white">Email ID</th>
                            <th className="text-white">Contact No.</th>
                            <th className="text-white">User Type</th>
                            <th className="text-white">user status</th>
                            {/* <th className="text-white">Rating</th> */}
                            <th className="text-white">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {totalCustomers ? (
                            totalCustomers.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.user_house_num ? item.user_house_num : ''} {item.user_locality ? item.user_locality : ''} {item.user_city ? item.user_city : ''} {item.user_state ? item.user_state : ''}</td>
                                <td>{item.user_zipcode ? item.user_zipcode : <span></span>}</td>
                                <td>{item.email}</td>
                                <td>{item.user_phno ? item.user_phno : <span></span>}</td>
                                <td>{item.user_type}</td>
                                <td>
                                  {item.user_status === "1" ? (
                                    <>
                                      <span className="status-icon bg-success" />
                                      Active
                                    </>
                                  ) : (
                                    <>
                                      {/* {" "} */}
                                      <span className="status-icon bg-danger" />
                                      Inactive
                                    </>
                                  )}
                                </td>
                                <td className="text-center"><FaTrashAlt onClick={() => deleteCustomer(item.id)} style={{ cursor: "pointer" }} /></td>
                              </tr>
                            ))
                          ) : ''}
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
    </AdminLayout>);
}

export default Listustomers;