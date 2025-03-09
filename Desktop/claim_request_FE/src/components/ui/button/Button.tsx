import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";
import { ButtonProps } from "@/types/button.type";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const buttonClasses = classNames(
      styles.button,
      styles[type],
      styles[size],
      shape && styles[shape],
      {
        [styles.danger]: danger,
        [styles.ghost]: ghost,
        [styles.disabled]: disabled || loading,
      }
    );

    return (
      <button
        ref={ref}
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
  }
);

Button.displayName = "Button";