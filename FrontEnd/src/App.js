import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Room from "./Components/Room";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Logindashboard from "./Components/Protected/Logindashboard";
import Registerdashboard from "./Components/Protected/Register";
import Admindashboard from "./Components/Protected/Admindashboard";
import Staffdashboard from "./Components/Protected/Staffdashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/logindashboard" element= {<Logindashboard/>}/>
          <Route path="/Registerdashboard" element= {<Registerdashboard/>}/>
          <Route path="/admin-dashboard" element= {<Admindashboard/>}/>
          <Route path="/staff-dashboard" element= {<Staffdashboard/>}/>
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
