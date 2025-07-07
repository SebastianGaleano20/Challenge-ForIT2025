import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <section className="dashboard">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={sidebarOpen} />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </section>
  );
}
