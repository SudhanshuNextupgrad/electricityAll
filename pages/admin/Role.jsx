import AdminLayout from '@/layouts/AdminLayout';
import Link from 'next/link';
import Head from 'next/head';
import { deleteData, getData } from '@/helpers/services';
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";
import { getFormatedDate, verifyIsLoggedIn } from '@/helpers/helper';
import { useRouter } from 'next/router';

const Role = () => {

  const route = useRouter();
  const [NewsLetterList, setNewsLetterList] = useState();
  const [refresh, setRefresh] = useState();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);

  useEffect(() => {
    get_newsletter();
    verifyIsLoggedIn(route)
  }, [refresh]);

  const get_newsletter = async () => {
    setisSubmitingLoader(true)
    try {
      const resp = await getData("/GetNewsLetter")
      resp.data ? setNewsLetterList(resp.data) : setNewsLetterList([])
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)

  }

  const deleteNewsLetter = async (id) => {
    setisSubmitingLoader(true)
    try {
      const resp = await deleteData("/DeleteNewsLetter", { "delId": id })
      resp.message == "Record Deleted Successfully" ? toast.success(resp.message) : toast.error(resp.message)
      setRefresh(Math.random)
    } catch (error) {
      console.log("try-catch error", error)
    }
    setisSubmitingLoader(false)
  }


  return (
    <AdminLayout>
      <Head>
        <title>News Letter</title>
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
                <h4 className="page-title">News Letter</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    News Letter
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group m-0">
                      <div className="row gutters-xs">
                        <div className="col-4">
                          <input
                            type="search"
                            className="form-control header-search"
                            placeholder="Search…"
                            aria-label="Search"
                            tabIndex={1}
                          />
                        </div>
                        <div className="col-3">
                          <input
                            type="email"
                            className="form-control header-search"
                            placeholder="email ID"
                          />
                        </div>
                        <div className="col-2">
                          <select className="form-control custom-select">
                            <option value="">Services</option>
                            <option value="Services1">Services 1</option>
                            <option value="Services2">Services 2</option>
                          </select>
                        </div>
                        <div className="col-2">
                          <select className="form-control custom-select">
                            <option value="">Rating</option>
                            <option value="Rating1">Rating 1</option>
                            <option value="Rating2">Rating 2</option>
                          </select>
                        </div>
                        <div className="col-1">
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                              <Link href="/employee-detail" className="text-inherit">
                                Untrammelled prevents{" "}
                              </Link>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
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
                              <span className="status-icon bg-success" /> Completed
                            </td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                          </tr>  <tr>
                            <td>
                              <a href="#" className="text-inherit">
                                Untrammelled prevents{" "}
                              </a>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
                            </td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                          </tr>  <tr>
                            <td>
                              <a href="#" className="text-inherit">
                                Untrammelled prevents{" "}
                              </a>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
                            </td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                          </tr>  <tr>
                            <td>
                              <a href="#" className="text-inherit">
                                Untrammelled prevents{" "}
                              </a>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
                            </td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                          </tr>  <tr>
                            <td>
                              <a href="#" className="text-inherit">
                                Untrammelled prevents{" "}
                              </a>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
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

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card">
                  {/* <div className="card-body">
                    <div className="form-group m-0">
                      <div className="row gutters-xs">
                        <div className="col-4">
                          <input
                            type="search"
                            className="form-control header-search"
                            placeholder="Search…"
                            aria-label="Search"
                            tabIndex={1}
                          />
                        </div>
                        <div className="col-3">
                          <input
                            type="email"
                            className="form-control header-search"
                            placeholder="email ID"
                          />
                        </div>
                        <div className="col-2">
                          <select className="form-control custom-select">
                            <option value="">Services</option>
                            <option value="Services1">Services 1</option>
                            <option value="Services2">Services 2</option>
                          </select>
                        </div>
                        <div className="col-2">
                          <select className="form-control custom-select">
                            <option value="">Rating</option>
                            <option value="Rating1">Rating 1</option>
                            <option value="Rating2">Rating 2</option>
                          </select>
                        </div>
                        <div className="col-1">
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="card-body">

                    <div className="table-responsive">

                      <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th className="text-white">Sr. No.</th>
                            <th className="text-white">Email ID</th>
                            <th className="text-white">Date</th>
                            <th className="text-white">Action</th>
                            {/* <th className="text-white">Price</th>
                            <th className="text-white">Project Name</th>
                            <th className="text-white">Date</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Price</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Price</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {NewsLetterList?.map((item, index) => (
                            <tr key={index}>
                              {/* <td>
                              <Link href="/employee-detail" className="text-inherit">
                                Untrammelled prevents{" "}
                              </Link>
                            </td>
                            <td>28 May 2018</td>
                            <td>
                              <span className="status-icon bg-success" /> Completed
                            </td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td>
                            <td>$56,908</td> */}
                              <td>{index + 1}</td>
                              <td>{item.email}</td>
                              <td>{getFormatedDate(item.created_at, "DD-MM-YYYY")}</td>
                              <td><FaTrashAlt onClick={() => deleteNewsLetter(item.id)} style={{ cursor: "pointer" }} /></td>
                            </tr>))}



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
}

export default Role;