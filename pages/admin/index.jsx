import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn } from "@/helpers/helper";
import { Toaster, toast } from "sonner";
// import { getData } from "@/services/services";
import { getData } from "@/helpers/services";
// import Header from "@/components/AdminPanel/Header";
import Header from "@/components/AdminPanel/Header";
import Footer from "@/components/AdminPanel/Footer";
import Sidebar from "@/components/AdminPanel/sidebar";
import AdminLayout from "@/layouts/AdminLayout";
import Head from 'next/head';
import { usePathname } from "next/navigation";



 
const Index = () => {
  const router = useRouter();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);

  useEffect(() => {
   verifyIsLoggedIn(router)
  }, []);


  return (

    <AdminLayout>
      <Head>
        <title>Electricity - Admin</title>
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

        <div className="app-content ">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Dashboard</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                </ol>
              </div>
              <div className="page-rightheader">
                <div className="ml-3 ml-auto d-flex">&nbsp;</div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="card overflow-hidden">
                  <div className="card-body pb-0">
                    <div className="text-left mb-4">
                      <p className=" mb-1">Gross profit Margin</p>
                      <h2 className="mb-0 font-weight-semibold">
                        50%{" "}
                        <span className="fs-12 text-muted">
                          <span className="text-success mr-1">
                            <i className="fe fe-arrow-up ml-1 " /> 12%{" "}
                          </span>{" "}
                          since last week{" "}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="sparknwe">
                    <img src="/g1.png" alt="" />{" "}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="card overflow-hidden">
                  <div className="card-body pb-0">
                    <div className="text-left mb-4">
                      <p className=" mb-1"> Opex Ratio</p>
                      <h2 className="mb-0 font-weight-semibold">
                        20%{" "}
                        <span className="fs-12 text-muted">
                          <span className="text-danger mr-1">
                            <i className="fe fe-arrow-down ml-1 " /> 0.34%{" "}
                          </span>{" "}
                          since last week{" "}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="sparknwe">
                    <img src="/g2.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="card overflow-hidden">
                  <div className="card-body pb-0">
                    <div className="text-left mb-4">
                      <p className=" mb-1">Operating Profit Margin</p>
                      <h2 className="mb-0 font-weight-semibold">
                        30%{" "}
                        <span className="fs-12 text-muted">
                          <span className="text-success mr-1">
                            <i className="fe fe-arrow-up ml-1 " /> 0.12%{" "}
                          </span>{" "}
                          since last week{" "}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="sparknwe">
                    <img src="/g3.png" alt="" />{" "}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="card overflow-hidden">
                  <div className="card-body pb-0">
                    <div className="text-left mb-4">
                      <p className=" mb-1">Net Profit Margin</p>
                      <h2 className="mb-0 font-weight-semibold">
                        45%{" "}
                        <span className="fs-12 text-muted">
                          <span className="text-danger mr-1">
                            <i className="fe fe-arrow-down ml-1" />
                            0.82%{" "}
                          </span>{" "}
                          since last week{" "}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="sparknwe">
                    <img src="/g4.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Customer Feedbacks</h3>
                    <div className="card-options ">
                      <a
                        href="#"
                        className="card-options-collapse"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-up" />
                      </a>
                      <a
                        href="#"
                        className="card-options-remove"
                        data-toggle="card-remove"
                      >
                        <i className="fe fe-x" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body p-0 ">
                    <div className="list-group list-lg-group list-group-flush">
                      <a
                        className="list-group-item list-group-item-action"
                        href="#"
                      >
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle mr-3"
                            src="/1.jpg"
                            alt="Image description"
                          />
                          <div className="media-body">
                            <div className="d-md-flex align-items-center">
                              <h6 className="mb-1 font-weight-semibold">
                                {" "}
                                Samantha Wilson
                              </h6>
                              <small className="text-muted ml-md-auto">
                                <i className="fe fe-calendar mr-1" /> 28 jun 2019{" "}
                              </small>
                            </div>
                            <p className="mb-0 text-muted fs-13">
                              Itaque earum rerum hic tenetur a sapiente reiciendis
                              voluptatibus.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#"
                      >
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle mr-3"
                            src="/4.jpg"
                            alt="Image description"
                          />
                          <div className="media-body">
                            <div className="d-md-flex align-items-center">
                              <h6 className="mb-1 font-weight-semibold">
                                {" "}
                                Kevin North{" "}
                              </h6>
                              <small className="text-muted ml-md-auto">
                                <i className="fe fe-calendar mr-1" /> 26 jun 2019{" "}
                              </small>
                            </div>
                            <p className="mb-0 text-muted fs-13">
                              Itaque earum rerum hic tenetur a sapiente reiciendis
                              voluptatibus.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#"
                      >
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle mr-3"
                            src="/3.jpg"
                            alt="Image description"
                          />
                          <div className="media-body">
                            <div className="d-md-flex align-items-center">
                              <h6 className="mb-1 font-weight-semibold">
                                {" "}
                                Steven Fisher
                              </h6>
                              <small className="text-muted ml-md-auto">
                                <i className="fe fe-calendar mr-1" /> 02 jul 2019{" "}
                              </small>
                            </div>
                            <p className="mb-0 text-muted fs-13">
                              Itaque earum rerum hic tenetur a sapiente reiciendis
                              voluptatibus.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#"
                      >
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle mr-3"
                            src="/5.jpg"
                            alt="Image description"
                          />
                          <div className="media-body">
                            <div className="d-md-flex align-items-center">
                              <h6 className="mb-1 font-weight-semibold">
                                Steven Fisher
                              </h6>
                              <small className="text-muted ml-md-auto">
                                <i className="fe fe-calendar mr-1" /> 12 jul 2019{" "}
                              </small>
                            </div>
                            <p className="mb-0 text-muted fs-13">
                              Itaque earum rerum hic tenetur a sapiente reiciendis
                              voluptatibus.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        className="list-group-item list-group-item-action br-br-7 br-bl-7"
                        href="#"
                      >
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle mr-3"
                            src="/1.jpg"
                            alt="Image description"
                          />
                          <div className="media-body">
                            <div className="d-md-flex align-items-center">
                              <h6 className="mb-1 font-weight-semibold">
                                {" "}
                                Joanne Taylor
                              </h6>
                              <small className="text-muted ml-md-auto">
                                <i className="fe fe-calendar mr-1" /> 15 jul 2019{" "}
                              </small>
                            </div>
                            <p className="mb-0 text-muted fs-13">
                              Itaque earum rerum hic tenetur a sapiente reiciendis
                              voluptatibus.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-xl-8 col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      Customer Transactions Details
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive ">
                      <table className="table table-hover card-table border table-vcenter  text-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Info</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Phil Watson</td>
                            <td>31-05-2019</td>
                            <td className="text-success">Transfer</td>
                            <td>$2,48,960.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-primary"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Sonia Robertson</td>
                            <td>02-06-2019</td>
                            <td className="text-primary">Shares</td>
                            <td>$78,956.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-secondary"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Matt Arnold</td>
                            <td>12-06-2019</td>
                            <td className="text-danger">Bonds</td>
                            <td>$5,85,976.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-warning"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Adam Hamilton</td>
                            <td>16-06-2019</td>
                            <td className="text-danger">Bonds</td>
                            <td>$34,692.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-success"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Leah Morgan</td>
                            <td>17-06-2019</td>
                            <td className="text-success">Transfer</td>
                            <td>$7,89,465.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-danger"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Amelia McDonald</td>
                            <td>21-06-2019</td>
                            <td className="text-primary">Shares</td>
                            <td>$89,365.00</td>
                            <td>
                              <a className="badge badge-pill badge-info" href="#">
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Simon Clark</td>
                            <td>22-06-2019</td>
                            <td className="text-primary">Shares</td>
                            <td>$1,23,567.00</td>
                            <td>
                              <a
                                className="badge badge-pill badge-success"
                                href="#"
                              >
                                {" "}
                                View more
                              </a>
                            </td>
                          </tr>
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

export default Index;



