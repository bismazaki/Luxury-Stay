// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoPersonSharp } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa";
// import { AuthContext } from "./AuthContext";

// const Navbar = () => {
//   const { userInitial, token, userRole, handleLogout } = useContext(AuthContext);
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   console.log("User Initial:", userInitial);
//   console.log("User Role:", userRole);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header className={`header_area ${scrolled ? "scrolled" : ""}`}>
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-light">
//           <Link className="navbar-brand logo_h" to="/">
//             <h2 style={{ fontFamily: "Cinzel", display: "flex", alignItems: "center" }}>
//               <FaCrown style={{ marginRight: "8px", color: "blue" }} />
//               Luxury Stay
//             </h2>
//           </Link>
//           <button
//             className="navbar-toggler"
//             style={{ color: "blue" }}
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//           </button>
//           <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
//             <ul className="nav navbar-nav menu_nav ml-auto">
//               <li className="nav-item active">
//                 <Link className="nav-link" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">About us</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/rooms">Rooms</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>

//               <li className="nav-item mx-3 my-4 position-relative">
//                 {token && userRole?.toLowerCase() === "guest" && userInitial ? ( // ✅ Fixed case sensitivity
//                   <>
//                     <div className="user-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
//                       {userInitial}
//                     </div>
//                     {dropdownOpen && (
//                       <div className="dropdown-menu show">
//                         <Link className="dropdown-item" to="/profile">Show Profile</Link>
//                         <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link className="nav-link mx-3 my-1" to="/login">
//                     <IoPersonSharp size={20} />
//                   </Link>
//                 )}
//               </li>

//             </ul>
//           </div>
//         </nav>
//       </div>

//       <style>
//         {`
//         .nav-link.mx-3.my-1 {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           top: -3px;
//         }

//         .user-circle {
//           width: 35px;
//           height: 35px;
//           border-radius: 50%;
//           background-color: green;
//           color: white !important;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//           font-size: 16px;
//           cursor: pointer;
//           text-transform: uppercase;
//           overflow: visible;
//         }
        
//         .dropdown-menu {
//           position: absolute;
//           right: 0;
//           background: white;
//           border-radius: 5px;
//           box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//           min-width: 150px;
//           text-align: center;
//         }
//         .dropdown-item {
//           padding: 8px;
//           cursor: pointer;
//           color: black;
//         }
//         .dropdown-item:hover {
//           background-color: #f8f9fa;
//         }
//         `}
//       </style>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoPersonSharp } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa";
// import { AuthContext } from "./AuthContext";

// const Navbar = () => {
//   const { handleLogout } = useContext(AuthContext);  // Remove userInitial, userRole
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [guestInitial, setGuestInitial] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     // Sirf guest ka initial localStorage se lein
//     const storedGuestInitial = localStorage.getItem("userInitial_guest");
//     if (storedGuestInitial) {
//       setGuestInitial(storedGuestInitial);
//     }
//   }, []);

//   return (
//     <header className={`header_area ${scrolled ? "scrolled" : ""}`}>
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-light">
//           <Link className="navbar-brand logo_h" to="/">
//             <h2 style={{ fontFamily: "Cinzel", display: "flex", alignItems: "center" }}>
//               <FaCrown style={{ marginRight: "8px", color: "blue" }} />
//               Luxury Stay
//             </h2>
//           </Link>
//           <button
//             className="navbar-toggler"
//             style={{ color: "blue" }}
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//           </button>
//           <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
//             <ul className="nav navbar-nav menu_nav ml-auto">
//               <li className="nav-item active">
//                 <Link className="nav-link" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">About us</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/rooms">Rooms</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">Contact</Link>
//               </li>
//               <li className="nav-item mx-3 my-4 position-relative">
//                 {guestInitial ? (
//                   <>
//                     <div className="user-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
//                       {guestInitial}
//                     </div>
//                     {dropdownOpen && (
//                       <div className="dropdown-menu show">
//                         <Link className="dropdown-item" to="/profile">Show Profile</Link>
//                         <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link className="nav-link mx-3 my-1" to="/login">
//                     <IoPersonSharp size={20} />
//                   </Link>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//       <style>
//          {`
//          .nav-link.mx-3.my-1 {
//            display: flex;
//            align-items: center;
//            justify-content: center;
//            position: relative;
//            top: -3px;
//          }

//         .user-circle {
//            width: 35px;
//            height: 35px;
//            border-radius: 50%;
//            background-color: green;
//            color: white !important;
//            display: flex;
//            align-items: center;
//            justify-content: center;
//            font-weight: bold;
//            font-size: 16px;
//            cursor: pointer;
//            text-transform: uppercase;
//            overflow: visible;
//         }
        
//         .dropdown-menu {
//            position: absolute;
//            right: 0;
//            background: white;
//            border-radius: 5px;
//            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//            min-width: 150px;
//            text-align: center;
//         }
//         .dropdown-item {
//           padding: 8px;
//           cursor: pointer;
//           color: black;
//         }
//          .dropdown-item:hover {
//           background-color: #f8f9fa;
//          }
//          `}
//        </style>
//     </header>
//   );
// };

// export default Navbar;


import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guestInitial, setGuestInitial] = useState(localStorage.getItem("userInitial_guest") || null);
  const dropdownRef = useRef(null);
   const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setGuestInitial(localStorage.getItem("userInitial_guest"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    const handleGuestUpdate = () => {
      setGuestInitial(localStorage.getItem("userInitial_guest"));
    };
  
    window.addEventListener("guestLogin", handleGuestUpdate);
  
    return () => {
      window.removeEventListener("guestLogin", handleGuestUpdate);
    };
  }, []);
  
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const logout = ()=>{
  handleLogout();
  navigate('/login')
}
  return (
    <header className={`header_area ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand logo_h" to="/">
            <h2 style={{ fontFamily: "Cinzel", display: "flex", alignItems: "center" }}>
              <FaCrown style={{ marginRight: "8px", color: "blue" }} />
              Luxury Stay
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            style={{ color: "blue", border: "1px solid blue" }}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rooms">Rooms</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item mx-3 my-4 position-relative" ref={dropdownRef}>
                {guestInitial ? (
                  <>
                    <div className="user-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                      {guestInitial}
                    </div>
                    {dropdownOpen && (
                      <div className="dropdown-menu show">
                        <Link className="dropdown-item" to="/profile">Show Profile</Link>
                        <Link className="dropdown-item" to="/booking-history">Booking History</Link>
                        <Link className="dropdown-item" to="/payment-invoices">Invoices</Link>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            logout();
                        
                            // Sirf guest logout ho raha hai to remove karein
                            if (guestInitial) {
                              localStorage.removeItem("token_guest");
                              localStorage.removeItem("userInitial_guest");
                              localStorage.removeItem("userRole_guest");
                            }
                        
                            setGuestInitial(null);
                            setDropdownOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link className="nav-link mx-3 my-1" to="/login">
                    <IoPersonSharp size={20} />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <style>
        {`
        .nav-link.mx-3.my-1 {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          top: -3px;
        }

        .user-circle {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: green;
          color: white !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          text-transform: uppercase;
          overflow: visible;
          transition: background 0.3s ease-in-out;
        }

        .user-circle:hover {
          background-color: darkgreen;
        }
        
        .dropdown-menu {
          position: absolute;
          right: 0;
          background: white;
          border-radius: 5px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 150px;
          text-align: center;
          z-index: 1000;
          transform: translateY(10px);
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        
        .dropdown-item {
          padding: 10px;
          cursor: pointer;
          color: black;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .header_area.scrolled {
          background: white;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }

        .navbar-toggler {
          outline: none !important;
        }
        `}
      </style>
    </header>
  );
};

export default Navbar;
