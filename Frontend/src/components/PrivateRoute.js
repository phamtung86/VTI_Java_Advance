import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element, allowedRoles }) => {
  const curentUser = useContext(AuthContext) // Lấy role từ localStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem('token'); // Kiểm tra token

  if (!token) {
    return <Navigate to="/login" />; // Nếu chưa đăng nhập, chuyển hướng Login
  }
  const role = curentUser.role;
  return allowedRoles.includes(role) ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
