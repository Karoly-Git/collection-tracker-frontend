import { RxHamburgerMenu as HamburgerIcon } from "react-icons/rx";
import { IoMdClose as CloseIcon } from "react-icons/io";
import "./TopBar.scss";

type TopBarProps = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function TopBar({ isSidebarOpen, toggleSidebar }: TopBarProps) {
    return (
        <div className="top-bar">
            <h1>
                <span className="head">Collection</span> <span className="tail">Tracker</span>
            </h1>

            {!isSidebarOpen && <HamburgerIcon
                className="hamburger-icon"
                onClick={toggleSidebar}
            />}
            {isSidebarOpen && <CloseIcon
                className="hamburger-icon"
                onClick={toggleSidebar}
            />}
        </div>
    );
}
