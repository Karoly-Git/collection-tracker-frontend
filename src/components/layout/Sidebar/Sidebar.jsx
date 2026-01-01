import { NavLink } from "react-router-dom";
import "./sidebar.css";

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
                        <span className="label">Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports">
                        <span className="icon">
                            <IoIosStats />
                        </span>
                        <span className="label">Reports</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <span className="icon">
                            <IoSettingsOutline />
                        </span>
                        <span className="label">Settings</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/login">
                        <span className="icon">
                            <MdLogin />
                        </span>
                        <span className="label">Login</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
