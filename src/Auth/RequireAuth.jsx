import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRules }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  //   const location=useLocation();
  return isLoggedIn && allowedRules.find((myRole) => myRole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
