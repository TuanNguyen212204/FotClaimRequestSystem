import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "@/types/button.type";
export const Button: React.FC<ButtonProps> = ({
  type = "default",
  size = "middle",
  shape,
  danger = false,
  ghost = false,
  loading = false,
  disabled = false,
  icon,
  color,                
  backgroundColor,      
  children,
  onClick,
  style,
}) => {

  const buttonClasses = [
    styles.button,
    styles[type],
    styles[size],
    shape ? styles[shape] : "",
    danger ? styles.danger : "",
    ghost ? styles.ghost : "",
    disabled || loading ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        color,
        backgroundColor,
        ...style,
      }}
    >
      {loading ? (
        <span className={styles.loadingSpinner}></span>
      ) : (
        icon && <span className={styles.icon}>{icon}</span>
      )}
      {children}
    </button>
  );
};
