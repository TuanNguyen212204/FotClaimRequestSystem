import { HTTP_STATUS } from "@/constant/httpStatus";
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AuthenticationProps {
  children: JSX.Element;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    return children;
  }
  return <Navigate to={`/error/${HTTP_STATUS.UNAUTHORIZED}`} />;
};

export default Authentication;
