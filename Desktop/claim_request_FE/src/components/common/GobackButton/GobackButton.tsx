import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import styles from "./GoBackButton.module.css";
const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.goBackButton} style={{ fontSize: "20px" }}>
        <Button name="Go Back" onClick={() => navigate(-1)} />
      </div>
    </>
  );
};

export default GoBackButton;
