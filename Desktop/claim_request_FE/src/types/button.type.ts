export interface ButtonProps {
  type?: "primary" | "default" | "dashed" | "text" | "link";
  size?: "small" | "middle" | "large";
  shape?: "circle" | "round";
  danger?: boolean;
  ghost?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
