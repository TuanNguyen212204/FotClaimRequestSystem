import { HTTP_STATUS } from "@/constant/httpStatus";
import Chatbot from "@/components/ui/Chatbot/Chatbot";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleProps {
  children: JSX.Element;
  role_id: number | number[];
}

const Authorization: React.FC<RoleProps> = ({ children, role_id }) => {
  const roleIDStr = localStorage.getItem("role_id");
  const roleID = roleIDStr ? parseInt(roleIDStr) : null;

  if(roleID === null) {
    return <Navigate to={`/error/${HTTP_STATUS.UNAUTHORIZED}`} />;
  }

  const allowedRoles = Array.isArray(role_id) ? role_id : [role_id];

  if (!allowedRoles.includes(roleID)) {
      return <Navigate to={`/error/${HTTP_STATUS.FORBIDDEN}`} />;
  }
  if (roleID === 4) {
    return (
      <>
        <Chatbot />
        {children}
      </>
    );
  }
  return children;

};

export default Authorization;
