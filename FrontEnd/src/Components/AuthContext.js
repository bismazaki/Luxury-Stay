// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [userInitial, setUserInitial] = useState(null);

//   // ✅ Decode token whenever it changes
//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("Decoded Token:", decoded); // Debugging

//         const userName = decoded?.user?.name; // 🔹 Fix: Access `name` inside `user`
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//       } catch (error) {
//         console.error("Invalid Token:", error);
//         localStorage.removeItem("token");
//         setToken(null);
//         setUserInitial(null);
//       }
//     } else {
//       setUserInitial(null);
//     }
//   }, [token]);

//   // ✅ Handle Login (Update token & Navbar instantly)
//   const handleLogin = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);

//     // 🔹 Decode token immediately after login
//     try {
//       const decoded = jwtDecode(newToken);
//       setUserInitial(decoded?.user?.name?.charAt(0).toUpperCase() || null);
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   // ✅ Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUserInitial(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, userInitial, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInitial, setUserInitial] = useState(null);
  const [userRole, setUserRole] = useState(null); // ✅ Store role

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Debugging

        const userName = decoded?.user?.name;
        const role = decoded?.user?.role || "guest"; // 🔹 Default to "guest" if role is missing

        setUserRole(role); // ✅ Set user role
        setUserInitial(role !== "admin" ? userName?.charAt(0).toUpperCase() : null); // ✅ Hide for admin
      } catch (error) {
        console.error("Invalid Token:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUserInitial(null);
        setUserRole(null);
      }
    } else {
      setUserInitial(null);
      setUserRole(null);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode(newToken);
      setUserRole(decoded?.user?.role || "guest");
      setUserInitial(decoded?.user?.role !== "admin" ? decoded?.user?.name?.charAt(0).toUpperCase() : null);
    } catch (error) {
      console.error("Invalid Token on Login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
