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
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const [token, setToken] = useState(storedAuth.token || null);
  const [userInitial, setUserInitial] = useState(storedAuth.name ? storedAuth.name.charAt(0).toUpperCase() : null);
  const [userRole, setUserRole] = useState(storedAuth.role || "guest");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // ✅ Debugging

        const role = decoded?.user?.role || "guest";
        const name = decoded?.user?.name || null;

        setUserRole(role);
        setUserInitial(role !== "Admin" ? name?.charAt(0).toUpperCase() : null);
      } catch (error) {
        console.error("Invalid Token:", error);
        handleLogout(); // 🔹 Agar token invalid ho, to logout
      }
    }
  }, [token]);

  // const handleLogin = (response) => {
  //   const authData = {
  //     token: response.token,
  //     userId: response.userId,
  //     name: response.name,
  //     email: response.email,
  //     role: response.role,
  //   };

  //   localStorage.setItem("auth", JSON.stringify(authData));
  //   setToken(response.token);
  //   setUserRole(response.role);
  //   setUserInitial(response.role !== "Admin" ? response.name.charAt(0).toUpperCase() : null);
    
  //   console.log("Logged in as:", response.role); // ✅ Debugging
  // };
  // const handleLogin = (response) => {
  //   const authData = {
  //     token: response.token,
  //     userId: response.userId,
  //     name: response.name || "",  // ✅ Default empty string if name is undefined
  //     email: response.email,
  //     role: response.role || "guest", // ✅ Default role if undefined
  //   };
  
  //   localStorage.setItem("auth", JSON.stringify(authData));
  //   setToken(response.token);
  //   setUserRole(authData.role);
    
  //   // ✅ Prevent error by checking if name exists before using `charAt(0)`
  //   setUserInitial(authData.role !== "Admin" && authData.name ? authData.name.charAt(0).toUpperCase() : null);
    
  //   console.log("Logged in as:", authData.role); // ✅ Debugging
  // };
  const handleLogin = (response) => {
    const { token, name, userRole } = response; // Extract values
  
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userInitial", name ? name.charAt(0).toUpperCase() : "U"); // Store first letter of name
  
      setToken(token);
      setUserRole(userRole);
      setUserInitial(name ? name.charAt(0).toUpperCase() : "U"); // Set initial
    }
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setToken(null);
    setUserRole("guest");
    setUserInitial(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userInitial, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

