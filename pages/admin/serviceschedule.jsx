import AdminLayout from '@/layouts/AdminLayout';
import Link from 'next/link';
import Head from 'next/head';
const Serviceschedule = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Booked Services</title>
      </Head>
    <>

      <div className="app-content">
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">Service Schedule</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
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

                <ul className="nav panel-tabs">
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

                </ul>
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
                        <div className="tab-pane" id="tab2">
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
                        </div>

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

export default Serviceschedule;