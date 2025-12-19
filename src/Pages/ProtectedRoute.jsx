import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.Role === "admin";
  if(isAdmin){
    return children;
  }
  return <Navigate to={"/login"} replace />;
};
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!!token) {
    return children;
  }
  return <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
