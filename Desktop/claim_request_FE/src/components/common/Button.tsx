import { ButtonProps } from "../../types/button.type";
import styles from "./Button.module.css";

export const Button: React.FC<ButtonProps> = ({
  border,
  width,
  height,
  color,
  name,
  backgroundColor,
  borderRadius,
  padding,
  margin,
  onClick,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        border,
        color,
        backgroundColor,
        borderRadius,
        padding,
        margin,
        width,
        height,
      }}
    >
      {name}
    </button>
  );
};
