import { RxHamburgerMenu as HamburgerIcon } from "react-icons/rx";
import "./TopBar.css";

export default function TopBar({ onToggleSidebar }) {
    return (
        <div className="top-bar">
            <h1>Collection Tracker</h1>
            <HamburgerIcon
                className="hamburger-icon"
                onClick={onToggleSidebar}
            />
        </div>
    );
}
