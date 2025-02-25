import React, { useState, ReactNode } from "react";
import styles from "./Popover.module.css";

interface PopOverProps {
  placement: "top" | "right" | "left" | "bottom";
  z_index: string;
  title: string;
  content: ReactNode | string;
  bgColour?: React.CSSProperties["backgroundColor"];
  trigger: "hover" | "click" | "focus";
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function PopOver({
  placement,
  z_index,
  title,
  content,
  trigger,
  children,
  bgColour,
  style,
}: PopOverProps) {
  const [visible, setVisible] = useState(false);

  const eventHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
        }
      : trigger === "click"
      ? {
          onClick: () => setVisible((prev) => !prev),
        }
      : trigger === "focus"
      ? {
          onFocus: () => setVisible(true),
          onBlur: () => setVisible(false),
        }
      : {};

  return (
    <div className={styles.popover_container}>
      <div {...eventHandlers}>{children}</div>
      {visible && (
        <div
          className={`${styles.popover_position} ${styles[`popover_${placement}`]}`}
          style={{ zIndex: z_index }}
        >
          <div
            className={`${styles.popover_content} ${styles.animate_popIn}`}
            style={{ backgroundColor: bgColour, ...style }}
          >
            {title && <div className={styles.popover_title}>{title}</div>}
            <div>{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
