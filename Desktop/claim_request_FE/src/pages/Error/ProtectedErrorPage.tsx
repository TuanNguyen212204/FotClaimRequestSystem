import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ProtectedErrorPage: React.FC = () => {
  const { state } = useLocation();
  if (!state || !state.isError) {
    return <Navigate to="/" replace />;
  }
  return <ErrorPage />;
};

export default ProtectedErrorPage;
 