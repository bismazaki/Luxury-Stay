// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [userInitial, setUserInitial] = useState(null);
//   const [userRole, setUserRole] = useState(null); // ✅ Add userRole state

//   // ✅ Decode token whenever it changes
//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("Decoded Token:", decoded); // Debugging

//         const userName = decoded?.user?.name; 
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);

//         setUserRole(decoded?.user?.role || null); // ✅ Extract user role

//       } catch (error) {
//         console.error("Invalid Token:", error);
//         localStorage.removeItem("token");
//         setToken(null);
//         setUserInitial(null);
//         setUserRole(null);
//       }
//     } else {
//       setUserInitial(null);
//       setUserRole(null);
//     }
//   }, [token]);

//   // ✅ Handle Login
//   const handleLogin = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);

//     try {
//       const decoded = jwtDecode(newToken);
//       setUserInitial(decoded?.user?.name?.charAt(0).toUpperCase() || null);
//       setUserRole(decoded?.user?.role || null); // ✅ Set userRole on login
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   // ✅ Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
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
//   const [userInitial, setUserInitial] = useState(localStorage.getItem("userInitial") || null);
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];
//     let foundToken = null;

//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       if (storedToken) {
//         foundToken = storedToken;
//       }
//     });

//     if (foundToken) {
//       setToken(foundToken);
//       decodeToken(foundToken);
//     }
//   }, []);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userName = decoded?.user?.name;
//       const role = decoded?.user?.role;

//       setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//       setUserRole(role);

//       // ✅ LocalStorage mein bhi save karein
//       localStorage.setItem("userInitial", userName ? userName.charAt(0).toUpperCase() : "");
//       localStorage.setItem("userRole", role || "");
//     } catch (error) {
//       console.error("Invalid Token:", error);
//       localStorage.clear();
//       setToken(null);
//       setUserInitial(null);
//       setUserRole(null);
//     }
//   };

//   const handleLogin = (newToken) => {
//     try {
//       const decoded = jwtDecode(newToken);
//       const role = decoded?.user?.role;
//       const userName = decoded?.user?.name;

//       if (role) {
//         localStorage.setItem(`token_${role}`, newToken);
//         localStorage.setItem("userInitial", userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem("userRole", role);

//         setToken(newToken);
//         setUserRole(role);
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   const handleLogout = () => {
//     if (userRole) {
//       localStorage.removeItem(`token_${userRole}`);
//     }
//     localStorage.removeItem("userInitial");
//     localStorage.removeItem("userRole");

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
//   const [userInitial, setUserInitial] = useState(localStorage.getItem("userInitial") || null);
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];
//     let foundToken = null;

//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       if (storedToken) {
//         foundToken = storedToken;
//       }
//     });

//     if (foundToken) {
//       setToken(foundToken);
//       decodeToken(foundToken);
//     }
//   }, []);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userName = decoded?.user?.name;
//       const role = decoded?.user?.role?.toLowerCase();

//       setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//       setUserRole(role);
      
//       localStorage.setItem("userInitial", userName ? userName.charAt(0).toUpperCase() : "");
//       localStorage.setItem("userRole", role || "");
//     } catch (error) {
//       console.error("Invalid Token:", error);
//       localStorage.clear();
//       setToken(null);
//       setUserInitial(null);
//       setUserRole(null);
//     }
//   };

//   const handleLogin = (newToken) => {
//     try {
//       const decoded = jwtDecode(newToken);
//       const role = decoded?.user?.role?.toLowerCase();
//       const userName = decoded?.user?.name;

//       if (role) {
//         localStorage.setItem(`token_${role}`, newToken);
//         localStorage.setItem("userInitial", userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem("userRole", role);

//         setToken(newToken);
//         setUserRole(role);
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   const handleLogout = () => {
//     if (userRole) {
//       localStorage.removeItem(`token_${userRole}`);
//     }
//     localStorage.removeItem("userInitial");
//     localStorage.removeItem("userRole");

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


import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInitial, setUserInitial] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedRoles = ["guest", "admin", "staff"];

    savedRoles.forEach((role) => {
      const storedToken = localStorage.getItem(`token_${role}`);
      const storedInitial = localStorage.getItem(`userInitial_${role}`);
      const storedRole = localStorage.getItem(`userRole_${role}`);

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedInitial) {
        setUserInitial(storedInitial);
      }
      if (storedRole) {
        setUserRole(storedRole);
      }
    });
  }, []);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userName = decoded?.user?.name;
      const role = decoded?.user?.role?.toLowerCase();

      if (role) {
        setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
        setUserRole(role);

        localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
        localStorage.setItem(`userRole_${role}`, role);
      }
    } catch (error) {
      console.error("Invalid Token:", error);
      localStorage.clear();
      setToken(null);
      setUserInitial(null);
      setUserRole(null);
    }
  };

  const handleLogin = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      const role = decoded?.user?.role?.toLowerCase();
      const userName = decoded?.user?.name;

      if (role) {
        localStorage.setItem(`token_${role}`, newToken);
        localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
        localStorage.setItem(`userRole_${role}`, role);

        setToken(newToken);
        setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
        setUserRole(role);
      }
    } catch (error) {
      console.error("Invalid Token on Login:", error);
    }
  };

  const handleLogout = () => {
    if (userRole) {
      localStorage.removeItem(`token_${userRole}`);
      localStorage.removeItem(`userInitial_${userRole}`);
      localStorage.removeItem(`userRole_${userRole}`);
    }

    setToken(null);
    setUserInitial(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userInitial, userRole, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
