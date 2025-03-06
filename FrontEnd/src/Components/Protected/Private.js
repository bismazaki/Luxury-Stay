import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const adminToken = localStorage.getItem("token_admin");
  const staffToken = localStorage.getItem("token_staff");
  const adminRole = localStorage.getItem("userRole_admin");
  const staffRole = localStorage.getItem("userRole_staff");

  // Check if user has a valid role and token
  const isAdmin = adminToken && adminRole === "admin";
  const isStaff = staffToken && staffRole === "staff";

  if (allowedRoles.includes("admin") && isAdmin) {
    return <Outlet />;
  }
  if (allowedRoles.includes("staff") && isStaff) {
    return <Outlet />;
  }

  // Redirect to login if not authorized
  return <Navigate to="/logindashboard" />;
};

export default PrivateRoute;
