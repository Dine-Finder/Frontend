// This Component makes sure that the auth is present for all children conponent
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    // Here we find that if user is logged in then he would go to the desired page; otherwise if not logged in
    // he would be navigated to signup page
    auth?.user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/unauthorised" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
