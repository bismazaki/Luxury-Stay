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


// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userInitial, setUserInitial] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];

//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       const storedInitial = localStorage.getItem(`userInitial_${role}`);
//       const storedRole = localStorage.getItem(`userRole_${role}`);

//       if (storedToken) {
//         setToken(storedToken);
//       }
//       if (storedInitial) {
//         setUserInitial(storedInitial);
//       }
//       if (storedRole) {
//         setUserRole(storedRole);
//       }
//     });
//   }, []);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userName = decoded?.user?.name;
//       const role = decoded?.user?.role?.toLowerCase();

//       if (role) {
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//         setUserRole(role);

//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem(`userRole_${role}`, role);
//       }
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
//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem(`userRole_${role}`, role);

//         setToken(newToken);
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//         setUserRole(role);
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };

//   // const handleLogout = () => {
//   //   if (userRole) {
//   //     localStorage.removeItem(`token_${userRole}`);
//   //     localStorage.removeItem(`userInitial_${userRole}`);
//   //     localStorage.removeItem(`userRole_${userRole}`);
//   //   }

//   //   setToken(null);
//   //   setUserInitial(null);
//   //   setUserRole(null);
//   // };
//   const handleLogout = () => {
//     if (userRole) {
//       localStorage.removeItem(`token_${userRole}`);
//       localStorage.removeItem(`userInitial_${userRole}`);
//       localStorage.removeItem(`userRole_${userRole}`);
  
//       // Agar sirf guest logout ho raha hai, toh admin/staff ka state na hatayein
//       if (userRole === "guest") {
//         setUserInitial(null);
//         setUserRole(null);
//       } else {
//         setToken(null);
//         setUserInitial(null);
//         setUserRole(null);
//       }
//     }
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
//   const [userInitial, setUserInitial] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const savedRoles = ["guest", "admin", "staff"];
//     savedRoles.forEach((role) => {
//       const storedToken = localStorage.getItem(`token_${role}`);
//       const storedInitial = localStorage.getItem(`userInitial_${role}`);
//       const storedRole = localStorage.getItem(`userRole_${role}`);
//       if (storedToken) setToken(storedToken);
//       if (storedInitial) setUserInitial(storedInitial);
//       if (storedRole) setUserRole(storedRole);
//     });
//   }, []);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const userName = decoded?.user?.name;
//       const role = decoded?.user?.role?.toLowerCase();
//       if (role) {
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//         setUserRole(role);
//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem(`userRole_${role}`, role);
//       }
//     } catch (error) {
//       console.error("Invalid Token:", error);
//       localStorage.clear();
//       setToken(null);
//       setUserInitial(null);
//       setUserRole(null);
//     }
//   };

//   // const handleLogin = (newToken) => {
//   //   try {
//   //     const decoded = jwtDecode(newToken);
//   //     const role = decoded?.user?.role?.toLowerCase();
//   //     const userName = decoded?.user?.name;
//   //     if (role) {
//   //       localStorage.setItem(`token_${role}`, newToken);
//   //       localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
//   //       localStorage.setItem(`userRole_${role}`, role);
//   //       setToken(newToken);
//   //       setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
//   //       setUserRole(role);
//   //     }
//   //   } catch (error) {
//   //     console.error("Invalid Token on Login:", error);
//   //   }
//   // };
//   const handleLogin = (newToken) => {
//     try {
//       const decoded = jwtDecode(newToken);
//       const role = decoded?.user?.role?.toLowerCase();
//       const userName = decoded?.user?.name;
//       if (role) {
//         localStorage.setItem(`token_${role}`, newToken);
//         localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "");
//         localStorage.setItem(`userRole_${role}`, role);
  
//         // Ensure immediate state update
//         setToken(newToken);
//         setUserInitial(userName ? userName.charAt(0).toUpperCase() : ""); // Ensure it's not null
//         setUserRole(role);
//       }
//     } catch (error) {
//       console.error("Invalid Token on Login:", error);
//     }
//   };
  
//   const handleLogout = () => {
//     if (userRole) {
//       localStorage.removeItem(`token_${userRole}`);
//       localStorage.removeItem(`userInitial_${userRole}`);
//       localStorage.removeItem(`userRole_${userRole}`);
//       setToken(null);
//       setUserInitial(null);
//       setUserRole(null);
//     }
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
  
//         // Event dispatch karo taki Navbar turant update ho
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
  
//     // Reset state values after logout
//     setToken(null);
//     setUserInitial(null); // Set default guest initial
//     setUserRole(null); // Set default role to guest
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
  const [userInitial, setUserInitial] = useState("G"); // Default "G" for guest
  const [userRole, setUserRole] = useState("guest");   // Default role as guest

  useEffect(() => {
    const savedRoles = ["guest", "admin", "staff"];
    let foundToken = false;

    savedRoles.forEach((role) => {
      const storedToken = localStorage.getItem(`token_${role}`);
      const storedInitial = localStorage.getItem(`userInitial_${role}`);
      const storedRole = localStorage.getItem(`userRole_${role}`);

      if (storedToken) {
        setToken(storedToken);
        foundToken = true;
      }
      if (storedInitial) setUserInitial(storedInitial);
      if (storedRole) setUserRole(storedRole);
    });

    if (!foundToken) {
      setUserInitial("G");
      setUserRole("guest");
    }
  }, []);

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);  // Ensure updates are applied

  // This function decodes the token and updates user info
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userName = decoded?.user?.name;
      const role = decoded?.user?.role?.toLowerCase();

      if (role) {
        setUserInitial(userName ? userName.charAt(0).toUpperCase() : "G");
        setUserRole(role);

        localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "G");
        localStorage.setItem(`userRole_${role}`, role);
      }
    } catch (error) {
      console.error("Invalid Token:", error);
      localStorage.clear();
      setToken(null);
      setUserInitial("G");
      setUserRole("guest");
    }
  };

  // Add the custom event listener for profile updates
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
      const userName = decoded?.user?.name;

      if (role) {
        localStorage.setItem(`token_${role}`, newToken);
        localStorage.setItem(`userInitial_${role}`, userName ? userName.charAt(0).toUpperCase() : "G");
        localStorage.setItem(`userRole_${role}`, role);

        setToken(newToken);
        setUserInitial(userName ? userName.charAt(0).toUpperCase() : "G");
        setUserRole(role);

        // Dispatch an event so other components (e.g., Navbar) update immediately
        window.dispatchEvent(new Event("guestLogin"));
      }
    } catch (error) {
      console.error("Invalid Token on Login:", error);
    }
  };

  const handleLogout = () => {
    if (userRole === "guest") {
      // Remove only guest-specific data
      localStorage.removeItem("token_guest");
      localStorage.removeItem("userInitial_guest");
      localStorage.removeItem("userRole_guest");
    } else {
      // Remove only the logged-in user's data
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
