import { NavLink } from "react-router-dom";
import './Sidebar.scss';

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

const menuItems = [
    { to: "/", icon: MdOutlineDashboardCustomize, text: "Dashboard" },
    { to: "/reports", icon: IoIosStats, text: "Reports" },
    { to: "/settings", icon: IoSettingsOutline, text: "Settings" },
    { to: "/login", icon: MdLogin, text: "Login" },
];

type SidebarProps = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
    return (
        <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <ul>
                {menuItems.map(({ to, icon: Icon, text }) => (
                    <li key={to}>
                        <NavLink to={to} onClick={toggleSidebar}>
                            <span className="icon">
                                <Icon />
                            </span>
                            <span className="text">
                                {text}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
