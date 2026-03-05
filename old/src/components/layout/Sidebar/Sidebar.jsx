import { NavLink } from "react-router-dom";
import "./sidebar.scss";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

export default function Sidebar({ isSidebarOpen }) {
    return (
        <nav className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
            <ul>
                <li>
                    <NavLink to="/" end>
                        <span className="icon">
                            <MdOutlineDashboardCustomize />
                        </span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports">
                        <span className="icon">
                            <IoIosStats />
                        </span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <span className="icon">
                            <IoSettingsOutline />
                        </span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/login">
                        <span className="icon">
                            <MdLogin />
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
