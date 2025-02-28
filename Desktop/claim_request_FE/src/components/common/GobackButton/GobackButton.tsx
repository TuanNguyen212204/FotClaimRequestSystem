import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import styles from "./GoBackButton.module.css";
import React from "react";
// import { getPreviousPage } from "./previousPage";
// import { PATH } from "@/constant/config";

interface GoBackButtonProps {
  label?: string;
  fallBackRoute?: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  label = "Go Back",
  // fallBackRoute = PATH.home,
}) => {
  const navigate = useNavigate();
  // const handleGoBack = () => {
  //   const previousPath = getPreviousPage();
  //   if (previousPath) navigate(-1);
  //   navigate(fallBackRoute);
  // };

  return (
    <>
      <div className={`${styles.goBackButton}`}>
        <Button name={label} onClick={() => navigate(-1)} />
      </div>
    </>
  );
};

export default GoBackButton;
