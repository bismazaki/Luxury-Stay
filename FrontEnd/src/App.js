import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Room from "./Components/Room";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Logindashboard from "./Components/Protected/Logindashboard";
import Registerdashboard from "./Components/Protected/Register";
import Staffdashboard from "./Components/Protected/Staffdashboard";
import Staffrequest from "./Components/Protected/Admin/Staffrequest";
import AdminLayout from "./Components/Protected/Admin/Adminlayout";
import Admindashboard from "./Components/Protected/Admin/AdminDashboard";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Navbar sirf non-admin pages pe show hoga */}
      {children}
      {!isAdminRoute && <Footer />} {/* Footer bhi sirf normal pages pe rahega */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logindashboard" element={<Logindashboard />} />
          <Route path="/registerdashboard" element={<Registerdashboard />} />
          <Route path="/staff-dashboard" element={<Staffdashboard />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<Admindashboard />} />
            <Route path="staff-requests" element={<Staffrequest />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
