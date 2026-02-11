import { useState } from "react";
import TopBar from "../topbar/TopBar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

import "./AppLayout.scss";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="app-layout">
            <TopBar
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

            <div className="layout-row">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
