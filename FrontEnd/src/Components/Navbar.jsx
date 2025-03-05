
// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoPersonSharp } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa";
// import { AuthContext } from "./AuthContext"; // Import AuthContext

// const Navbar = () => {
//   const { userInitial, token, handleLogout } = useContext(AuthContext);
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   console.log("User Initial:", userInitial);

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
//                 {token ? (
//                   <div
//                     className="user-circle"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     {userInitial}

//                   </div>
//                 ) : (
//                   <Link className="nav-link mx-3 my-1" to="/login">
//                     <IoPersonSharp size={20} />
//                   </Link>
//                 )}
//                 {dropdownOpen && token && (
//                   <div className="dropdown-menu show">
//                     <Link className="dropdown-item" to="/profile">Show Profile</Link>
//                     <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                   </div>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>

//       <style>
//         {`
//         .nav-link.mx-3.my-1 {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   top: -3px; /* Adjust this value as needed */
// }

//           .user-circle {
//       width: 35px;
//       height: 35px;
//       border-radius: 50%;
//       background-color: green;
//       color: white !important; /* Force text color */
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-weight: bold;
//       font-size: 16px;
//       cursor: pointer;
//       text-transform: uppercase; /* Ensure uppercase initials */
//       overflow: visible; /* Ensure text isn't hidden */
//     }
//           .dropdown-menu {
//             position: absolute;
//             right: 0;
//             background: white;
//             border-radius: 5px;
//             box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//             min-width: 150px;
//             text-align: center;
//           }
//           .dropdown-item {
//             padding: 8px;
//             cursor: pointer;
//             color: black;
//           }
//           .dropdown-item:hover {
//             background-color: #f8f9fa;
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
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { userInitial, token, userRole, handleLogout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log("userinitial" , userInitial);
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
              {/* <li className="nav-item mx-3 my-4 position-relative">
                {token ? (
                  userRole === "Guest" && userInitial ? ( 
                    <>
                      <div className="user-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {userInitial}
                      </div>
                      {dropdownOpen && (
                        <div className="dropdown-menu show">
                          <Link className="dropdown-item" to="/profile">Show Profile</Link>
                          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link className="nav-link mx-3 my-1" to="/login">
                      <IoPersonSharp size={20} />
                    </Link>
                  )
                ) : (
                  <Link className="nav-link mx-3 my-1" to="/login">
                    <IoPersonSharp size={20} />
                  </Link>
                )}
              </li> */}
              <li className="nav-item mx-3 my-4 position-relative">
  {token ? ( 
    userRole === "guest" && userInitial ? ( 
      <>
        <div className="user-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {userInitial}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu show">
            <Link className="dropdown-item" to="/profile">Show Profile</Link>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </>
    ) : (
      <Link className="nav-link mx-3 my-1" to="/login">
        <IoPersonSharp size={20} />
      </Link>
    )
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

