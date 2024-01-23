import Link from 'next/link';
import { useState, useEffect } from "react";

import { getData } from '@/helpers/services';
import { FaLaptop, FaUserLarge, FaBusinessTime, FaClipboardList, FaSuitcase, FaRectangleList, FaBox, FaBookBookmark, FaTicket } from "react-icons/fa6";


const Sidebar = () => {

  const [username, setUserName] = useState("")
  const [userRole, setUserRole] = useState('')
  const [userPhoto, setUserPhoto] = useState('')

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      if (typeof window !== 'undefined') {
        const EmpId = localStorage.getItem("UserId[E]")
        const resp = await getData(`/GetAllUser?id=${EmpId}`)
        console.log("resp", resp)
        setUserName(resp.data[0].name)
        setUserRole(resp.data[0].user_type)
        setUserPhoto(resp.data[0].user_profile_photo)

      }
    } catch (error) {
      console.log("try-catch error", error)
    }

  }
  return (
    <>
      <aside className="app-sidebar ps ps--active-y">
        <div className="app-sidebar__user">
          <div className="dropdown user-pro-body text-center">
            <div className="user-pic">
              <img
                src={userPhoto == null ? "/dummy.jpg" : `https://53c50cd527.nxcli.io/electricity/public/images/profile_photo/${userPhoto}`}
                alt="user-img"
                className="avatar-xl rounded-circle mb-1"
              />
            </div>
            <div className="user-info">
              <h6 className=" mb-0 font-weight-semibold">{username}</h6>
              <span className="text-muted app-sidebar__user-name text-sm">Employee</span>
            </div>
          </div>
        </div>
        <ul className="side-menu">
          <li className="slide is-expanded">
            <Link
              className="side-menu__item active"
              href="/employee/"
              data-toggle="slide"
            >
              <FaLaptop />
              <span className="side-menu__label">Dashboard</span>
            </Link>
          </li>

          <li className="slide">
            <Link className="side-menu__item" data-toggle="slide" href="/employee/serviceschedule">
              <FaBusinessTime />
              <span className="side-menu__label">Scheduled Services</span>

            </Link>
          </li>
          <li className="slide">
            <Link className="side-menu__item" data-toggle="slide" href="/employee/ticket">
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