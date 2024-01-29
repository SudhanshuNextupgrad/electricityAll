import AdminLayout from '@/layouts/AdminLayout';
import Link from 'next/link';

const Role = () => {
  return (
    <AdminLayout>
      <>
        <div className="app-content">
          <div className="side-app leftmenu-icon">
            <div className="page-header">
              <div className="page-leftheader">
                <h4 className="page-title">Role</h4>
                <ol className="breadcrumb pl-0">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Role
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
            </div>
          </div>
        </div>


      </>
    </AdminLayout>


  );
}

export default Role;