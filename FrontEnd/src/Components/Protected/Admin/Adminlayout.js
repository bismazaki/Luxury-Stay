import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="main" style={{ padding: 0, margin: 0 }}>
      <Sidebar />
      <div style={{ marginTop: "100px", padding: "0 20px" }}> {/* AppBar ke height ke equal margin */}
        <main style={{ padding: 0, margin: 0 }}>
          <Outlet /> {/* Nested Routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
