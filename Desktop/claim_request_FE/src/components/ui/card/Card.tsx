import React from "react";

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  children?: React.ReactNode;
  hoverable?: boolean;
  variant?: "basic" | "image" | "overlay";
  size?: "default" | "small";
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  title,
  extra,
  cover,
  actions,
  children,
  hoverable = false,
  variant = "basic",
  size = "default",
  style = {},
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {},
}) => {
  const basePadding = size === "small" ? 8 : 16;
  const baseFontSize = size === "small" ? 14 : 16;

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: hoverable ? "box-shadow 0.3s" : undefined,
    width: "100%",
    ...style,
  };

  let coverNode = null;
  if (cover) {
    if (variant === "overlay") {
      coverNode = (
        <div
          style={{
            width: "100%",
            height: 200,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage:
              typeof cover === "string" ? `url(${cover})` : undefined,
            position: "relative",
          }}
        >
          {typeof cover !== "string" && cover}
        </div>
      );
    } else {
      coverNode = (
        <div style={{ width: "100%" }}>
          {typeof cover === "string" ? (
            <img
              src={cover}
              alt="Cover"
              style={{ width: "100%", objectFit: "cover" }}
            />
          ) : (
            cover
          )}
        </div>
      );
    }
  }

  const headerNode =
    (title || extra) && variant !== "overlay" ? (
      <div
        style={{
          padding: basePadding,
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: baseFontSize,
          fontWeight: 500,
          ...headerStyle,
        }}
      >
        <div>{title}</div>
        <div>{extra}</div>
      </div>
    ) : null;

  const overlayHeaderNode =
    (title || extra) && variant === "overlay" ? (
      <div
        style={{
          position: "absolute",
          bottom: basePadding,
          left: basePadding,
          right: basePadding,
          color: "black",
          fontSize: baseFontSize,
          fontWeight: 500,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{title}</div>
        <div>{extra}</div>
      </div>
    ) : null;

  const bodyNode = (
    <div
      style={{
        padding: basePadding,
        fontSize: baseFontSize,
        lineHeight: 1.5,
        ...bodyStyle,
      }}
    >
      {children}
    </div>
  );

  const footerNode =
    actions && actions.length > 0 ? (
      <div
        style={{
          padding: basePadding,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-around",
          ...footerStyle,
        }}
      >
        {actions.map((action, index) => (
          <div key={index} style={{ flex: 1, textAlign: "center" }}>
            {action}
          </div>
        ))}
      </div>
    ) : null;

  return variant === "overlay" ? (
    <div style={wrapperStyle}>
      <div style={{ position: "relative" }}>
        {coverNode}
        {overlayHeaderNode}
      </div>
      {bodyNode}
      {footerNode}
    </div>
  ) : (
    <div style={wrapperStyle}>
      {coverNode}
      {headerNode}
      {bodyNode}
      {footerNode}
    </div>
  );
};

export default Card;
