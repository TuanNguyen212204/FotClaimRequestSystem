import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleProps {
  children: JSX.Element;
  role_id: number | number[]; 
}

const Authorization: React.FC<RoleProps> = ({ children, role_id }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const allowedRoles = Array.isArray(role_id) ? role_id : [role_id]; 

  if (!user || !allowedRoles.includes(user.role_id)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default Authorization;
