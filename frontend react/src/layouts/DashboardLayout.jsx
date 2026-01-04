import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* Page Content */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
