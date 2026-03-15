import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/layouts/Header/Header";
import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import Footer from "@/components/layouts/Footer/Footer";

import "./AppLayout.scss";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className="app-layout">
            <Header
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="app-layout__body">
                <main className="app-layout__content">
                    <Outlet />
                </main>

                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            <Footer />
        </div>
    );
}