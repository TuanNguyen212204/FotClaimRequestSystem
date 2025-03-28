import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ErrorPage.module.css";
import { HTTP_STATUS } from "@/constant/httpStatus";
import UnauthorizedImage from "@assets/401.Error_Unauthorized.svg";
import ForbiddenImage from "@assets/403.Error_Forbidden.svg";
import NotFoundImage from "@assets/404.Error_Not_Found.svg";
import ServerErrorImage from "@assets/500.Internal_Server_Error.svg";
import ServiceUnavailableImage from "@assets/503.Error_Service_Unavailable.svg";
import { FIRST_PAGE_BY_ROLE } from "@/constant/firstPageByRole";

export interface ErrorPageProps {
  code?: number;
  message?: string;
}

const errorImages: { [key: number]: string } = {
  [HTTP_STATUS.UNAUTHORIZED]: UnauthorizedImage,
  [HTTP_STATUS.FORBIDDEN]: ForbiddenImage,
  [HTTP_STATUS.NOT_FOUND]: NotFoundImage,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ServerErrorImage,
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: ServiceUnavailableImage,
};

const allowedCodes = [
  HTTP_STATUS.UNAUTHORIZED,
  HTTP_STATUS.FORBIDDEN,
  HTTP_STATUS.NOT_FOUND,
  HTTP_STATUS.INTERNAL_SERVER_ERROR,
  HTTP_STATUS.SERVICE_UNAVAILABLE,
];

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { code: codeParam } = useParams<{ code: string }>();
  const navigate = useNavigate();

  let errorCode = codeParam
    ? Number(codeParam)
    : props.code ?? HTTP_STATUS.NOT_FOUND;

  if (!allowedCodes.includes(errorCode)) {
    errorCode = HTTP_STATUS.NOT_FOUND;
  }

  const handleRedirect = () => {
    if (
      errorCode === HTTP_STATUS.UNAUTHORIZED ||
      errorCode === HTTP_STATUS.NOT_FOUND
    ) {
      navigate("/");
    } else if (errorCode === HTTP_STATUS.FORBIDDEN) {
      const roleIDStr = localStorage.getItem("role_id");
      const roleID = roleIDStr ? parseInt(roleIDStr) : null;
      if (roleID === null) {
        navigate("/");
        return;
      }
      if (roleID === 1) {
        navigate(`${FIRST_PAGE_BY_ROLE.ADMIN}`);
      } else if (roleID === 2) {
        navigate(`${FIRST_PAGE_BY_ROLE.APPROVER}`);
      } else if (roleID === 3) {
        navigate(`${FIRST_PAGE_BY_ROLE.FINANCE}`);
      } else if (roleID === 4) {
        navigate(`${FIRST_PAGE_BY_ROLE.CLAIMER}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={errorImages[errorCode]} alt={`Error ${errorCode}`} />
        {[HTTP_STATUS.UNAUTHORIZED, HTTP_STATUS.NOT_FOUND].includes(
          errorCode
        ) && (
          <button className={styles.button} onClick={handleRedirect}>
            <FaArrowLeft /> Go to Login
          </button>
        )}
        {errorCode === HTTP_STATUS.FORBIDDEN && (
          <button className={styles.button} onClick={handleRedirect}>
            <FaArrowLeft /> Go to Home
          </button>
        )}
        {[
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          HTTP_STATUS.SERVICE_UNAVAILABLE,
        ].includes(errorCode)}
      </div>
      <div className={styles.content}></div>
    </div>
  );
};

export default ErrorPage;
