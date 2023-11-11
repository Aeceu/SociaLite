import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Auth() {
  const token = Cookies.get("token");
  return token;
}

export const ProtectedRoutes = () => {
  const token = Auth();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoutes = () => {
  const token = Auth();

  return token ? <Navigate to="/" /> : <Outlet />;
};
