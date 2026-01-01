import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/appLayout/AppLayout";

import Dashboard from "../../pages/dashboard/Dashboard";
import Reports from "../../pages/reports/Reports";
import Settings from "../../pages/settings/Settings";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}
