import TopBar from '../TopBar/TopBar';
import './Header.scss';

type HeaderProps = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};


export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
    return (
        <header>
            <TopBar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
        </header>
    )
}
