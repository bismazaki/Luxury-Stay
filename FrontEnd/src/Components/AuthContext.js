// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userInitial, setUserInitial] = useState("G"); // Default "G" for guest
//   const [userRole, setUserRole] = useState("guest");   // Default role as guest

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];
//     let foundToken = false;

//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       const storedInitial = localStorage.getItem(`userInitial_${role}`);
//       const storedRole = localStorage.getItem(`userRole_${role}`);

//       if (storedToken) {
//         setToken(storedToken);
//         foundToken = true;
//       }
//       if (storedInitial) setUserInitial(storedInitial);
//       if (storedRole) setUserRole(storedRole);
//     });

//     if (!foundToken) {
//       setUserInitial("G");
//       setUserRole("guest");
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       decodeToken(token);
//     }
//   }, [token]);  // Ensure updates are applied

//   // This function decodes the token and updates user info
//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userName = decoded?.user?.name;
//       const role = decoded?.user?.role?.toLowerCase();

//       if (role) {
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : "G");
//         setUserRole(role);

//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "G");
//         localStorage.setItem(`userRole_${role}`, role);
//       }
//     } catch (error) {
//       console.error("Invalid Token:", error);
//       localStorage.clear();
//       setToken(null);
//       setUserInitial("G");
//       setUserRole("guest");
//     }
//   };

//   // Add the custom event listener for profile updates
//   useEffect(() => {
//     const handleProfileUpdated = () => {
//       if (token) {
//         decodeToken(token);
//       }
//     };

//     window.addEventListener("profileUpdated", handleProfileUpdated);
//     return () => {
//       window.removeEventListener("profileUpdated", handleProfileUpdated);
//     };
//   }, [token]);

//   const handleLogin = (newToken) => {
//     try {
//       const decoded = jwtDecode(newToken);
//       const role = decoded?.user?.role?.toLowerCase();
//       const userName = decoded?.user?.name;

//       if (role) {
//         localStorage.setItem(`token_${role}`, newToken);
//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "G");
//         localStorage.setItem(`userRole_${role}`, role);

//         setToken(newToken);
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : "G");
//         setUserRole(role);

//         // Dispatch an event so other components (e.g., Navbar) update immediately
//         window.dispatchEvent(new Event("guestLogin"));
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   const handleLogout = () => {
//     if (userRole === "guest") {
//       // Remove only guest-specific data
//       localStorage.removeItem("token_guest");
//       localStorage.removeItem("userInitial_guest");
//       localStorage.removeItem("userRole_guest");
//     } else {
//       // Remove only the logged-in user's data
//       localStorage.removeItem(`token_${userRole}`);
//       localStorage.removeItem(`userInitial_${userRole}`);
//       localStorage.removeItem(`userRole_${userRole}`);
//     }

//     setToken(null);
//     setUserInitial(null);
//     setUserRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, userInitial, userRole, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userInitial, setUserInitial] = useState("G");  // Default: 'G' for Guest
//   const [guestName, setGuestName] = useState("Guest");  // Default full name
//   const [userRole, setUserRole] = useState("guest");    

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];
//     let foundToken = false;

//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       const storedInitial = localStorage.getItem(`userInitial_${role}`);
//       const storedName = localStorage.getItem(`guestName_${role}`);
//       const storedRole = localStorage.getItem(`userRole_${role}`);

//       if (storedToken) {
//         setToken(storedToken);
//         foundToken = true;
//       }
//       if (storedInitial) setUserInitial(storedInitial);  
//       if (storedName) setGuestName(storedName);         
//       if (storedRole) setUserRole(storedRole);
//     });

//     if (!foundToken) {
//       setUserInitial("G");
//       setGuestName("Guest");
//       setUserRole("guest");
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       decodeToken(token);
//     }
//   }, [token]);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userFullName = decoded?.user?.name;
//       const role = decoded?.user?.role?.toLowerCase();

//       if (role) {
//         const initial = userFullName ? userFullName.charAt(0).toUpperCase() : "G";

//         setUserInitial(initial);
//         setGuestName(userFullName || "Guest");
//         setUserRole(role);

//         localStorage.setItem(`userInitial_${role}`, initial);
//         localStorage.setItem(`guestName_${role}`, userFullName || "Guest");
//         localStorage.setItem(`userRole_${role}`, role);
//       }
//     } catch (error) {
//       console.error("Invalid Token:", error);
//       localStorage.clear();
//       setToken(null);
//       setUserInitial("G");
//       setGuestName("Guest");
//       setUserRole("guest");
//     }
//   };

//   useEffect(() => {
//     const handleProfileUpdated = () => {
//       if (token) {
//         decodeToken(token);
//       }
//     };

//     window.addEventListener("profileUpdated", handleProfileUpdated);
//     return () => {
//       window.removeEventListener("profileUpdated", handleProfileUpdated);
//     };
//   }, [token]);

//   const handleLogin = (newToken) => {
//     try {
//       const decoded = jwtDecode(newToken);
//       const role = decoded?.user?.role?.toLowerCase();
//       const userFullName = decoded?.user?.name;

//       if (role) {
//         const initial = userFullName ? userFullName.charAt(0).toUpperCase() : "G";

//         localStorage.setItem(`token_${role}`, newToken);
//         localStorage.setItem(`userInitial_${role}`, initial);
//         localStorage.setItem(`guestName_${role}`, userFullName || "Guest");
//         localStorage.setItem(`userRole_${role}`, role);

//         setToken(newToken);
//         setUserInitial(initial);
//         setGuestName(userFullName || "Guest");
//         setUserRole(role);

//         window.dispatchEvent(new Event("guestLogin"));
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   const handleLogout = () => {
//     if (userRole === "guest") {
//       localStorage.removeItem("token_guest");
//       localStorage.removeItem("userInitial_guest");
//       localStorage.removeItem("guestName_guest");
//       localStorage.removeItem("userRole_guest");
//     } else {
//       localStorage.removeItem(`token_${userRole}`);
//       localStorage.removeItem(`userInitial_${userRole}`);
//       localStorage.removeItem(`guestName_${userRole}`);
//       localStorage.removeItem(`userRole_${userRole}`);
//     }

//     setToken(null);
//     setUserInitial("G");
//     setGuestName("Guest");
//     setUserRole("guest");
//   };

//   return (
//     <AuthContext.Provider value={{ token, userInitial, guestName, userRole, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInitial, setUserInitial] = useState("G");
  const [guestName, setGuestName] = useState("Guest");
  const [userRole, setUserRole] = useState("guest");
  const [userId, setUserId] = useState(null);  // ✅ Added userId state

  useEffect(() => {
    const savedRoles = ["guest", "admin", "staff"];
    let foundToken = false;

    savedRoles.forEach((role) => {
      const storedToken = localStorage.getItem(`token_${role}`);
      const storedInitial = localStorage.getItem(`userInitial_${role}`);
      const storedName = localStorage.getItem(`guestName_${role}`);
      const storedRole = localStorage.getItem(`userRole_${role}`);
      const storedUserId = localStorage.getItem(`userId_${role}`); // ✅ Retrieve userId

      if (storedToken) {
        setToken(storedToken);
        foundToken = true;
      }
      if (storedInitial) setUserInitial(storedInitial);
      if (storedName) setGuestName(storedName);
      if (storedRole) setUserRole(storedRole);
      if (storedUserId) setUserId(storedUserId); // ✅ Set userId if available
    });

    if (!foundToken) {
      setUserInitial("G");
      setGuestName("Guest");
      setUserRole("guest");
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userFullName = decoded?.user?.name;
      const role = decoded?.user?.role?.toLowerCase();
      const id = decoded?.user?.id;  // ✅ Get user ID from token

      if (role) {
        const initial = userFullName ? userFullName.charAt(0).toUpperCase() : "G";

        setUserInitial(initial);
        setGuestName(userFullName || "Guest");
        setUserRole(role);
        setUserId(id || "guest_id"); // ✅ Set default guest ID if missing

        localStorage.setItem(`userInitial_${role}`, initial);
        localStorage.setItem(`guestName_${role}`, userFullName || "Guest");
        localStorage.setItem(`userRole_${role}`, role);
        localStorage.setItem(`userId_${role}`, id || "guest_id"); // ✅ Store userId
      }
    } catch (error) {
      console.error("Invalid Token:", error);
      localStorage.clear();
      setToken(null);
      setUserInitial("G");
      setGuestName("Guest");
      setUserRole("guest");
      setUserId(null);
    }
  };

  useEffect(() => {
    const handleProfileUpdated = () => {
      if (token) {
        decodeToken(token);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, [token]);

  const handleLogin = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      const role = decoded?.user?.role?.toLowerCase();
      const userFullName = decoded?.user?.name;
      const id = decoded?.user?.id; // ✅ Get user ID

      if (role) {
        const initial = userFullName ? userFullName.charAt(0).toUpperCase() : "G";

        localStorage.setItem(`token_${role}`, newToken);
        localStorage.setItem(`userInitial_${role}`, initial);
        localStorage.setItem(`guestName_${role}`, userFullName || "Guest");
        localStorage.setItem(`userRole_${role}`, role);
        localStorage.setItem(`userId_${role}`, id || "guest_id"); // ✅ Store userId

        setToken(newToken);
        setUserInitial(initial);
        setGuestName(userFullName || "Guest");
        setUserRole(role);
        setUserId(id || "guest_id"); // ✅ Set userId

        window.dispatchEvent(new Event("guestLogin"));
      }
    } catch (error) {
      console.error("Invalid Token on Login:", error);
    }
  };

  const handleLogout = () => {
    if (userRole === "guest") {
      localStorage.removeItem("token_guest");
      localStorage.removeItem("userInitial_guest");
      localStorage.removeItem("guestName_guest");
      localStorage.removeItem("userRole_guest");
      localStorage.removeItem("userId_guest"); // ✅ Remove guest user ID
    } else {
      localStorage.removeItem(`token_${userRole}`);
      localStorage.removeItem(`userInitial_${userRole}`);
      localStorage.removeItem(`guestName_${userRole}`);
      localStorage.removeItem(`userRole_${userRole}`);
      localStorage.removeItem(`userId_${userRole}`); // ✅ Remove user ID
    }

    setToken(null);
    setUserInitial("G");
    setGuestName("Guest");
    setUserRole("guest");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userInitial, guestName, userRole, userId, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
