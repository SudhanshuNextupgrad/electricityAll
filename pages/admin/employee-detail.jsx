const Employeedetail = () => {
    return ( 
        <>
        <div className="app-content">
  <div className="side-app leftmenu-icon">
  <div className="page-header">
      <div className="page-leftheader">
        <h4 className="page-title">Employee Detail</h4>
        <ol className="breadcrumb pl-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          Employee Detail
          </li>
        </ol>
      </div>
      <div className="page-rightheader">
        <div className="ml-3 ml-auto d-flex">&nbsp;</div>
      </div>
    </div>


        <div className="row">
  <div className="col-xl-3 col-lg-5 col-md-12">
    <div className="card ">
      <div className="card-body">
        <div className="inner-all">
          <ul className="list-unstyled">
            <li className="text-center border-bottom-0">
              <img
                data-no-retina=""
                className="img-circle img-responsive img-bordered-primary"
                src="/1.jpg"
                alt="John Doe"
              />
            </li>
            <li className="text-center">
              <h4 className="text-capitalize mt-3 mb-0">Anna Sthesia</h4>
              <p className="text-muted text-capitalize">App Developer</p>
            </li>
            <li>
              <a href="" className="btn btn-primary text-center btn-block">
                Message Send
              </a>
            </li>
            <li>
              <br />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="card panel-theme rounded shadow">
      <div className="card-header">
        <div className="float-left">
          <h3 className="card-title">Contact</h3>
        </div>
        <div className="card-options text-right">
          <a href="#" className="btn btn-sm btn-primary mr-2">
            <i className="fa fa-facebook" />
          </a>
          <a href="#" className="btn btn-sm btn-primary mr-2">
            <i className="fa fa-twitter" />
          </a>
          <a href="#" className="btn btn-sm btn-primary">
            <i className="fa fa-google-plus" />
          </a>
        </div>
        <div className="clearfix" />
      </div>
      <div className="card-body no-padding rounded">
        <ul className="list-group no-margin">
          <li className="list-group-item">
            <strong>Full Name :</strong> John Thomson
          </li>
          <li className="list-group-item">
            <strong>Location :</strong> USA
          </li>
          <li className="list-group-item">
            <strong>Languages :</strong> English.
          </li>
          <li className="list-group-item">
            <strong>Email :</strong> gemestayer@ele.com
          </li>
          <li className="list-group-item">
            <strong>Phone :</strong> +125 254 3562
          </li>
        </ul>
        <div className="col-md-12">
          <div className="media-heading">
            <h5>
              <strong>Biography</strong>
            </h5>
          </div>
          <p>
            {" "}
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus
          </p>
          <p>
            because it is pleasure, but because those who do not know how to
            pursue pleasure rationally encounter consequences that are extremely
            painful. Nor again is there anyone who loves or pursues or desires
            to obtain pain of itself, because it is pain, but because
            occasionally circumstances occur in which toil and pain can procure
            him some great pleasure.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-9 col-lg-7 col-md-12">
   
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header pt-5 pb-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <ul className="list-group card-list-group">
            <li className="list-group-item py-5">
              <div className="media m-0">
                <div
                  className="media-object avatar brround avatar-md mr-4 cover-image"
                  data-image-src="/3.jpg"
                  style={{ background: 'url("/3.jpg") center center' }}
                />
                <div className="media-body d-block">
                  <div className="media-heading">
                    <small className="float-right text-muted">4 min</small>
                    <h5>George Mestayer</h5>
                  </div>
                  <div>
                    {" "}
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet{" "}
                  </div>
                  <ul className="media-list">
                    <li className="media mt-4">
                      <div
                        className="media-object brround avatar mr-4 cover-image"
                        data-image-src="/3.jpg"
                        style={{ background: 'url("/3.jpg") center center' }}
                      />
                      <div className="media-body">
                        {" "}
                        Holley Corby: I must explain to you how all this
                        mistaken idea of denouncing pleasure and praising pain
                        was born and I will give you{" "}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="list-group-item py-5">
              <div className="media m-0">
                <div
                  className="media-object avatar brround avatar-md mr-4 cover-image"
                  data-image-src="/3.jpg"
                  style={{ background: 'url("/3.jpg") center center' }}
                />
                <div className="media-body">
                  <div className="media-heading">
                    <small className="float-right text-muted">34 min</small>
                    <h5>George Mestayer</h5>
                  </div>
                  <div>
                    {" "}
                    Nam libero tempore, cum soluta nobis est eligendi optio
                    cumque nihil impedit quo minus id quod maxime placeat facere
                    possimus, omnis voluptas assumenda est, omnis dolor
                    repellendus
                  </div>
                  <ul className="media-list">
                    <li className="media mt-4">
                      <div
                        className="media-object brround avatar mr-4 cover-image"
                        data-image-src="/3.jpg"
                        style={{ background: 'url("/3.jpg") center center' }}
                      />
                      <div className="media-body">
                        {" "}
                        Art Langner: master-builder of human happiness. No one
                        rejects, dislikes, or avoids pleasure itself, because it
                        is pleasure{" "}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Projects</h3>
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
          <div className="card-body">
            <div className="table-responsive">
              <table className="table card-table table-vcenter border text-nowrap">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>                  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="store.html" className="text-inherit">
                        Untrammelled prevents{" "}
                      </a>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$56,908</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="store.html" className="text-inherit">
                        Untrammelled prevents
                      </a>
                    </td>
                    <td>12 June 2018</td>
                    <td>
                      <span className="status-icon bg-danger" /> On going
                    </td>
                    <td>$45,087</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="store.html" className="text-inherit">
                        Untrammelled prevents
                      </a>
                    </td>
                    <td>12 July 2018</td>
                    <td>
                      <span className="status-icon bg-warning" /> Pending
                    </td>
                    <td>$60,123</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="store.html" className="text-inherit">
                        Untrammelled prevents
                      </a>
                    </td>
                    <td>14 June 2018</td>
                    <td>
                      <span className="status-icon bg-warning" /> Pending
                    </td>
                    <td>$70,435</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="store.html" className="text-inherit">
                        Untrammelled prevents
                      </a>
                    </td>
                    <td>25 June 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$15,987</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</div> </div>
</div>

        </>
     );
}
 
export default Employeedetail;