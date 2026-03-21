import { NavLink } from "react-router-dom";
import './BottomNav.scss';

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

export default function BottomNav() {
    return (
        <nav className='bottom-nav'>
            <ul>
                {menuItems.map(({ to, icon: Icon, text }) => (
                    <li key={to}>
                        <NavLink to={to}>
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
