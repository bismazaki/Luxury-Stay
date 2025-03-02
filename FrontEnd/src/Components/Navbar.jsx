// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { IoPersonSharp } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   return (
//     <>
//       <header className={`header_area ${scrolled ? 'scrolled' : ''}`}>
//         <div className="container">
//           <nav className="navbar navbar-expand-lg navbar-light">

//             {/* <Link className="navbar-brand logo_h" to="/"><img src="/image/Logo.png" alt=""/></Link> */}
//             <Link className="navbar-brand logo_h" to="/"> <h2 style={{ fontFamily: 'Cinzel', display: 'flex', alignItems: 'center' }}>
//               <FaCrown style={{ marginRight: '8px', color: 'blue' }} />
//               Luxury Stay
//             </h2></Link>
//             <button className="navbar-toggler" style={{color: 'blue'}} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//             <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
//               <ul className="nav navbar-nav menu_nav ml-auto">
//                 <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
//                 <li className="nav-item"><Link className="nav-link" to="/about">About us</Link></li>
//                 <li className="nav-item"><Link className="nav-link" to="/rooms">Rooms</Link></li>
//                 {/* <li className="nav-item submenu dropdown">
//                                 <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
//                                 <ul className="dropdown-menu">
//                                     <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
//                                     <li className="nav-item"><a className="nav-link" href="blog-single.html">Blog Details</a></li>
//                                 </ul>
//                             </li>  */}
//                 <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
//                 <li className="nav-item mx-3 my-1"><Link className="nav-link" to="/login"><IoPersonSharp size={20} /></Link></li>
//               </ul>

//             </div>
//           </nav>
//         </div>
//       </header>


//     </>
//   )
// }

// export default Navbar
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoPersonSharp } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa";
// import { jwtDecode } from "jwt-decode"; // Install this using: npm install jwt-decode

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [userInitial, setUserInitial] = useState(null); // Store user initial

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
//     // ✅ Check if token exists in localStorage
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); // Decode JWT
//         const userName = decoded.user.name || "U"; // Get user name (default 'U')
//         setUserInitial(userName.charAt(0).toUpperCase()); // First letter Capital
//       } catch (error) {
//         console.error("Invalid Token:", error);
//         localStorage.removeItem("token"); // Remove invalid token
//         setUserInitial(null); // Reset to default
//       }
//     } else {
//       setUserInitial(null); // No token, show default icon
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

//               {/* ✅ Show Green Circle if Logged In, Otherwise Show Person Icon */}
//               <li className="nav-item mx-3 my-4">
//                 <Link className="nav-link" to="/login">
//                   {userInitial ? (
//                     <div className="user-circle">{userInitial}</div>
//                   ) : (
//                     <IoPersonSharp size={20} />
//                   )}
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>

//       {/* ✅ Add CSS for Green Circle */}
//       <style>
//         {`
//           .user-circle {
//             width: 30px;
//             height: 30px;
//             border-radius: 50%;
//             background-color: green;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-weight: bold;
//             font-size: 16px;
//           }
//         `}
//       </style>
//     </header>
//   );
// };

// export default Navbar;


import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const Navbar = () => {
  const { userInitial, token, handleLogout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("User Initial:", userInitial);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            style={{ color: "blue" }}
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
              <li className="nav-item mx-3 my-4 position-relative">
                {token ? (
                  <div
                    className="user-circle"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {userInitial}

                  </div>
                ) : (
                  <Link className="nav-link mx-3 my-1" to="/login">
                    <IoPersonSharp size={20} />
                  </Link>
                )}
                {dropdownOpen && token && (
                  <div className="dropdown-menu show">
                    <Link className="dropdown-item" to="/profile">Show Profile</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
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
  top: -3px; /* Adjust this value as needed */
}

          .user-circle {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: green;
      color: white !important; /* Force text color */
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      text-transform: uppercase; /* Ensure uppercase initials */
      overflow: visible; /* Ensure text isn't hidden */
    }
          .dropdown-menu {
            position: absolute;
            right: 0;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 150px;
            text-align: center;
          }
          .dropdown-item {
            padding: 8px;
            cursor: pointer;
            color: black;
          }
          .dropdown-item:hover {
            background-color: #f8f9fa;
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
