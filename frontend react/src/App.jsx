import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import Analysis from "./pages/Analysis";
import History from "./pages/History"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/research" element={<Research />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: "50px" }}>Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
