import EmployeeLayout from "@/layouts/EmployeeLayout";
import {FaStar } from "react-icons/fa6";
import Head from 'next/head';
import { useEffect } from "react";
import { verifyIsLoggedIn } from "@/helpers/helper";
import { useRouter } from "next/router";




const EmployeeHomepage = () => {
  const route = useRouter();
  useEffect(() => {
    verifyIsLoggedIn(route);
  }, []);
  return (
    <EmployeeLayout>
      <Head>
        <title>Electricity - Employee</title>
      </Head>
      <>
        <div className="app-content">
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
              <div className="col-xl-3 col-lg-6 col-md-6 sericesempl">
                <div className="card">
                  {" "}
                  <div className="card-body">
                    {" "}
                    <div className="d-flex justify-content-between">
                      {" "}
                      <h4 className="card-title">Today Services</h4>{" "}
                    </div>{" "}

                    <div className="list d-flex align-items-center border-bottom py-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="/1.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>Lilly </b>posted in Website
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">Awesome websites!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">2 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="list d-flex align-items-center border-bottom py-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="/2.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>Thomos</b>posted in Material
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">Awesome websites!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">3 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="list d-flex align-items-center border-bottom py-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="./3.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>Marry cott </b>posted in photo
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">That's Great!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">1 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="list d-flex align-items-center border-bottom py-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="/1.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>Lilly </b>posted in Website
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">Awesome websites!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">2 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="list d-flex align-items-center border-bottom py-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="/2.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>Thomos</b>posted in Material
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">Awesome websites!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">3 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="list d-flex align-items-center pt-3">
                      {" "}
                      <img
                        className="avatar avatar-md brround"
                        src="/5.jpg"
                        alt="image"
                      />{" "}
                      <div className="wrapper w-100 ml-3">
                        {" "}
                        <p className="mb-0">
                          {" "}
                          <b>John </b>posted in Status
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <i className="mdi mdi-clock text-muted mr-1" />{" "}
                            <p className="mb-0">Awesome websites!</p>
                          </div>{" "}
                          <small className="text-muted ml-auto">1 hours ago</small>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>


              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 graphbox">

                <div className="scroegraph">
                  <div className="card overflow-hidden">
                    <div className="card-body pb-0">
                      <div className="text-left mb-4">
                        <p className=" mb-1">Total Services</p>
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
                <div className="scroegraph">
                  <div className="card overflow-hidden">
                    <div className="card-body pb-0">
                      <div className="text-left mb-4">
                        <p className=" mb-1"> Today Services Completed</p>
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
                <div className="scroegraph">
                  <div className="card overflow-hidden">
                    <div className="card-body pb-0">
                      <div className="text-left mb-4">
                        <p className=" mb-1">Leave</p>
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
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="card formcard">
                  <div className="card-header">
                    <h3 className="card-title">Services Status</h3>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-lg-group list-group-flush">
                      <div className="form-group m-0">
                        {" "}
                        <div className="row gutters-xs">
                          {" "}
                          <div className="col-2">
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Services ID"
                            />{" "}
                          </div>{" "}
                          <div className="col-4">
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Customer Name"
                            />{" "}
                          </div>{" "}
                          <div className="col-3">
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Services"
                            />{" "}
                          </div>{" "}
                          <div className="col-3 form-group">
                            <div className="rating-stars-container">
                              {" "}
                              <div className="rating-star is--active">
                                {" "}
                                <FaStar />{" "}
                              </div>{" "}
                              <div className="rating-star is--active">
                                {" "}
                                <FaStar />{" "}
                              </div>{" "}
                              <div className="rating-star is--active">
                                {" "}
                                <FaStar />{" "}
                              </div>{" "}
                              <div className="rating-star is--active">
                                {" "}
                                <FaStar />{" "}
                              </div>{" "}
                              <div className="rating-star is--active">
                                {" "}
                                <FaStar />{" "}
                              </div>{" "}
                            </div>

                          </div>{" "}
                          <div className="col-12">

                            <textarea
                              className="form-control"
                              name="example-textarea-input"
                              rows={2}
                              placeholder="Services Request"
                              defaultValue={""}
                            />{" "}
                          </div>{" "}
                          <div className="col-12">
                            <button className="btn btn-primary pull-right">Submit</button>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
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
                      <a className="list-group-item list-group-item-action" href="#">
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
                      <a className="list-group-item list-group-item-action" href="#">
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
                      <a className="list-group-item list-group-item-action" href="#">
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

                    </div>
                  </div>
                </div>
              </div>






            </div>
            <div className="row">
              <div className="col-md-12 col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Customer Transactions Details</div>
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
                              <a className="badge badge-pill badge-primary" href="#">
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
                              <a className="badge badge-pill badge-secondary" href="#">
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
                              <a className="badge badge-pill badge-warning" href="#">
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
                              <a className="badge badge-pill badge-success" href="#">
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
                              <a className="badge badge-pill badge-danger" href="#">
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
                              <a className="badge badge-pill badge-success" href="#">
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
    </EmployeeLayout>
  );
}

export default EmployeeHomepage;