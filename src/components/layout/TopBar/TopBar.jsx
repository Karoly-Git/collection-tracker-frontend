import { RxHamburgerMenu as HamburgerIcon } from "react-icons/rx";
import { IoMdClose as CloseIcon } from "react-icons/io";
import "./TopBar.scss";

export default function TopBar({ isSidebarOpen, onToggleSidebar }) {
    return (
        <div className="top-bar">
            <h1>Collection Tracker</h1>
            {!isSidebarOpen && <HamburgerIcon
                className="hamburger-icon"
                onClick={onToggleSidebar}
            />}
            {isSidebarOpen && <CloseIcon
                className="hamburger-icon"
                onClick={onToggleSidebar}
            />}
        </div>
    );
}
