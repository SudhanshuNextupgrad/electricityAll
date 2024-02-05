import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import {
  FaLaptop,
  FaUserLarge,
  FaBusinessTime,
  FaClipboardList,
  FaSuitcase,
  FaRectangleList,
  FaBox,
  FaBookBookmark,
  FaTicket,
} from "react-icons/fa6";

const Sidebar = () => {

  const [heightLight, setHeightlight] = useState('')
  const route = useRouter()
  
  useEffect(() => {
    setHeightlight(route.pathname)
  }, []);

  return (
    <>
      <aside className="app-sidebar ps ps--active-y">
        {/* <div className="app-sidebar__user">
          <div className="dropdown user-pro-body text-center">
            <div className="user-pic">
              <img
                src="/HD.png"
                alt="user-img"
                className="avatar-lg rounded-circle mb-1"
              />
            </div>
            <div className="user-info">
              <h6 className=" mb-0 font-weight-semibold">{username}</h6>
              <span className="text-muted app-sidebar__user-name text-sm">
                Admin
              </span>
            </div>
          </div>
        </div> */}
        <ul className="side-menu">
          <li className="slide is-expanded" >
            <Link
              className={`side-menu__item ${heightLight == "/admin" ? " active" : ''}`}
              href="/admin"
              data-toggle="slide"
            >
              <FaLaptop />
              <span className="side-menu__label">Dashboard</span>
            </Link>
          </li>
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/Employeelist" ? " active" : ''}`}
              href="/admin/Employeelist"
              data-toggle="slide"
            >
              <FaUserLarge />
              <span className="side-menu__label">List of Employee</span>
            </Link>
          </li>
          {/* <li className="slide">
            <Link
              className="side-menu__item"
              data-toggle="slide"
              href="/serviceschedule"
            >
              <FaBusinessTime />
              <span className="side-menu__label">Scheduled Services</span>
            </Link>
          </li> */}
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/Listustomers" ? " active " : ''}`}
              data-toggle="slide"
              href="/admin/Listustomers"
            >
              <FaClipboardList />
              <span className="side-menu__label">List of Customers</span>
            </Link>
          </li>
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/Servicerequest" ? " active" : ''}`}
              data-toggle="slide"
              href="/admin/Servicerequest"
            >
              <FaSuitcase />
              <span className="side-menu__label">Scheduled Services</span>
            </Link>
          </li>
          <li className="slide" >
            <Link className={`side-menu__item ${heightLight == "/admin/detailsservices" ? " active" : ''}`} href="/admin/detailsservices">
              <FaRectangleList />
              <span className="side-menu__label">Services</span>
            </Link>
          </li>
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/subscription" ? " active" : ''}`}
              data-toggle="slide"
              href="/admin/subscription"
            >
              <FaBox />
              <span className="side-menu__label">Subscription</span>
            </Link>
          </li>
          <li className="slide" >
            <Link className={`side-menu__item ${heightLight == "/admin/Role" ? " active" : ''}`} data-toggle="slide" href="/admin/Role">
              <FaBookBookmark />
              <span className="side-menu__label">News Letter</span>
            </Link>
          </li>
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/Locations" ? " active" : ''}`}
              data-toggle="slide"
              href="/admin/Locations"
            >
              <FaTicket />
              <span className="side-menu__label">Locations</span>
            </Link>
          </li>
          <li className="slide" >
            <Link
              className={`side-menu__item ${heightLight == "/admin/ticket" ? " active" : ''}`}
              data-toggle="slide"
              href="/admin/ticket"
            >
              <FaTicket />
              <span className="side-menu__label">Ticket</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
