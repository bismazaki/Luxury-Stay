import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import PrivateRoute from "./Components/Protected/Private";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Room from "./Components/Room";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import ProfileG from "./Components/Profile";
import Bookinghistory from "./Components/Bookinghistory";
import Invoice from "./Components/Paymentinvoice";
import Logindashboard from "./Components/Protected/Logindashboard";
import Registerdashboard from "./Components/Protected/Register";
import AdminLayout from "./Components/Protected/Admin/Adminlayout";
import Admindashboard from "./Components/Protected/Admin/AdminDashboard";
import Staffdashboard from "./Components/Protected/Staff/Staffdashboard";
import Staffrequest from "./Components/Protected/Admin/Staffrequest";
import Usermanagement from "./Components/Protected/Admin/Usermanagement";
import Roommanagement from "./Components/Protected/Admin/Roommanagement";
import Bookingmanagement from "./Components/Protected/Admin/Bookingmanagement";
import Billing from "./Components/Protected/Admin/Billing";
import Feedback from "./Components/Protected/Admin/Feedback";
import Profile from "./Components/Protected/Admin/Profile";
import Stafflayout from "./Components/Protected/Staff/Stafflayout";
import Roomser from "./Components/Protected/Staff/Roomser";
import Chckin from "./Components/Protected/Staff/Chckin";
import Booking from "./Components/Booking";
import Checkout from "./Components/Checkout";
import ConfirmationPage from "./Components/Confirmation";
import CreateBooking from "./Components/Protected/Staff/CreateBooking";
import BookingHistory from "./Components/Protected/Staff/Bookinghistory";
import StaffRooms from "./Components/Protected/Staff/Staffrooms";
import Staffcheckout from "./Components/Protected/Staff/Staffcheckout";
import Staffconfirmation from "./Components/Protected/Staff/Staffconfirmation";
import Staffmanagement from "./Components/Protected/Staff/Bookinghistory";
import Staffprofile from "./Components/Protected/Staff/Staffprofile";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />} 
      <Outlet />
      {!isAdminRoute && <Footer />} 
      
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/logindashboard" element={<Logindashboard />} />
        <Route path="/registerdashboard" element={<Registerdashboard />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileG />} />
          <Route path="/booking-history" element={<Bookinghistory/>} />
          <Route path="/payment-invoices" element={<Invoice/>} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/payment" element={<Checkout/>} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<Admindashboard />} />
            <Route path="staff-requests" element={<Staffrequest />} />
            <Route path="user-managemnt" element={<Usermanagement />} />
            <Route path="room-managemnt" element={<Roommanagement />} />
            <Route path="booking-managemnt" element={<Bookingmanagement />} />
            <Route path="billing-transaction" element={<Billing />} />
            <Route path="feedback-managemnt" element={<Feedback />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Protected Staff Routes */}
        <Route element={<PrivateRoute allowedRoles={["staff"]} />}>
  <Route path="/staff-dashboard" element={<Stafflayout />}>
    <Route index element={<Staffdashboard />} />
    <Route path="roomser" element={<Roomser />} />
    <Route path="chckin" element={<Chckin />} />
    <Route path="booking-management" element={<Staffmanagement/>} />
    <Route path="billing-transaction" element={<Billing />} />
    <Route path="feedback-management" element={<Feedback />} />
    <Route path="CreateBooking" element={<CreateBooking />} /> {/* Correct route */}
    <Route path="Bookingmanagement" element={<BookingHistory/>} />
    <Route path="staffroom" element={<StaffRooms />} />
    <Route path="staffcheckout" element={<Staffcheckout/>}/>
    <Route path="staffconfirmation" element={<Staffconfirmation/>}/>
    <Route path="staffprofile" element={<Staffprofile/>}/>

  </Route>
</Route>
  
    </Routes>
    </Router>
  );
}

export default App;
