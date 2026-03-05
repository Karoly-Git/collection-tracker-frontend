import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Footer from "@/components/layout/Footer/Footer";

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
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                />

                <main className="app-layout__content">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}