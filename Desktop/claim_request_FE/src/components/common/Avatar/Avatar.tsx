import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  alt?: string;
  gap?: number;
  icon?: React.ReactNode;
  shape?: "circle" | "square";
  size?: number | "profile" | "large" | "small" | "default";
  src?: string | React.ReactNode;
}

const validSizes = ["profile", "large", "small", "default"];

const Avatar: React.FC<AvatarProps> = ({
  alt = "",
  gap = 4,
  icon,
  shape = "circle",
  size = "default",
  src,
}) => {
  const sizeClass =
    typeof size === "string" && validSizes.includes(size)
      ? styles[size]
      : typeof size === "number"
      ? undefined
      : "";

  return (
    <div
      className={`${styles.avatar} ${styles[shape]} ${sizeClass}`}
      style={{
        gap,
        width: typeof size === "number" ? size : undefined,
        height: typeof size === "number" ? size : undefined,
      }}
    >
      {src ? (
        typeof src === "string" && src.trim() !== " " ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          src
        )
      ) : (
        icon
      )}
    </div>
  );
};

export default Avatar;
