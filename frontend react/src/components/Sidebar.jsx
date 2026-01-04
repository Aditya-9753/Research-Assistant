import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "80px" : "240px"
    );
  }, [collapsed]);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Equity AI</h2>}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          📊 {!collapsed && "Dashboard"}
        </Link>
        <Link
          to="/research"
          className={location.pathname === "/research" ? "active" : ""}
        >
           {!collapsed && "Research"}
        </Link>

         <Link
          to="/analysis"
          className={location.pathname === "/analysis" ? "active" : ""}
        >
           {!collapsed && "Analysis"}
        </Link>

        <Link
          to="/history"
          className={location.pathname === "/history" ? "active" : ""}
        >
           {!collapsed && "History"}
        </Link>
      </nav>
    </aside>
  );
}
