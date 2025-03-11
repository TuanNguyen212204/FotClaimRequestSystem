import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleProps {
  children: JSX.Element;
  roleID: number | number[]; 
}

const Authorization: React.FC<RoleProps> = ({ children, roleID }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const allowedRoles = Array.isArray(roleID) ? roleID : [roleID]; 

  if (!user || !allowedRoles.includes(user.roleID)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default Authorization;
