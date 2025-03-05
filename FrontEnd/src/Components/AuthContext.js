import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInitial, setUserInitial] = useState(null);
  const [userRole, setUserRole] = useState(null); // ✅ Add userRole state

  // ✅ Decode token whenever it changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Debugging

        const userName = decoded?.user?.name; 
        setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);

        setUserRole(decoded?.user?.role || null); // ✅ Extract user role

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

  // ✅ Handle Login
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode(newToken);
      setUserInitial(decoded?.user?.name?.charAt(0).toUpperCase() || null);
      setUserRole(decoded?.user?.role || null); // ✅ Set userRole on login
    } catch (error) {
      console.error("Invalid Token on Login:", error);
    }
  };

  // ✅ Handle Logout
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
