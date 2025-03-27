import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaLock,
  FaBan,
  FaCog,
  FaRegWindowClose,
} from "react-icons/fa";
import styles from "./ErrorPage.module.css";
import { HTTP_STATUS, HTTP_STATUS_TEXT } from "@/constant/httpStatus";

export interface ErrorPageProps {
  code?: number;
  message?: string;
}

// const icons: { [key: number]: JSX.Element } = {
//   401: <FaLock className={styles.icon} />,
//   403: <FaBan className={styles.icon} />,
//   404: <FaExclamationTriangle className={styles.icon} />,
//   500: <FaCog className={styles.icon} />,
//   502: <FaCog className={styles.icon} />,
//   503: <FaRegWindowClose className={styles.icon} />,
// };
const icons: { [key: number]: JSX.Element } = {
  [HTTP_STATUS.UNAUTHORIZED]: <FaLock className={styles.icon} />,
  [HTTP_STATUS.FORBIDDEN]: <FaBan className={styles.icon} />,
  [HTTP_STATUS.NOT_FOUND]: <FaExclamationTriangle className={styles.icon} />,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: <FaCog className={styles.icon} />,
  [HTTP_STATUS.BAD_GATEWAY]: <FaCog className={styles.icon} />,
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: (
    <FaRegWindowClose className={styles.icon} />
  ),
};

const defaultMessages: { [key: number]: string } = {
  401: HTTP_STATUS_TEXT.UNAUTHORIZED,
  403: HTTP_STATUS_TEXT.FORBIDDEN,
  404: HTTP_STATUS_TEXT.NOT_FOUND,
  500: HTTP_STATUS_TEXT.INTERNAL_SERVER_ERROR,
  502: HTTP_STATUS_TEXT.BAD_GATEWAY,
  503: HTTP_STATUS_TEXT.SERVICE_UNAVAILABLE,
};

const allowedCodes = [
  HTTP_STATUS.UNAUTHORIZED,
  HTTP_STATUS.FORBIDDEN,
  HTTP_STATUS.NOT_FOUND,
  HTTP_STATUS.INTERNAL_SERVER_ERROR,
  HTTP_STATUS.BAD_GATEWAY,
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

  const statusText =
    props.message || defaultMessages[errorCode] || HTTP_STATUS_TEXT.NOT_FOUND;
  const icon = icons[errorCode] || (
    <FaExclamationTriangle className={styles.icon} />
  );

  const handleRedirect = () => {
    if (errorCode === HTTP_STATUS.UNAUTHORIZED) {
      navigate("/login");
    } else if (
      errorCode === HTTP_STATUS.FORBIDDEN ||
      errorCode === HTTP_STATUS.NOT_FOUND
    ) {
      navigate("/firstPageByRole");
    } else if (
      [
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        HTTP_STATUS.BAD_GATEWAY,
        HTTP_STATUS.SERVICE_UNAVAILABLE,
      ].includes(errorCode)
    ) {
      navigate("/server-error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {icon}
        <h1 className={styles.code}>{errorCode}</h1>
        <h2 className={styles.status}>{statusText}</h2>
        {errorCode === HTTP_STATUS.UNAUTHORIZED && (
          <button className={styles.button} onClick={handleRedirect}>
            Go to Login
          </button>
        )}
        {(errorCode === HTTP_STATUS.FORBIDDEN ||
          errorCode === HTTP_STATUS.NOT_FOUND) && (
          <button className={styles.button} onClick={handleRedirect}>
            Go to First Page
          </button>
        )}
        {[
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          HTTP_STATUS.BAD_GATEWAY,
          HTTP_STATUS.SERVICE_UNAVAILABLE,
        ].includes(errorCode) && (
          <button className={styles.button} onClick={handleRedirect}>
            View Server Error Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
