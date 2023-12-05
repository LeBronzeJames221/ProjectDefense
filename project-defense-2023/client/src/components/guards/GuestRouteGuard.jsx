import { useContext } from "react";
import AuthContext from "../../contexts/authContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRouteGuard() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
