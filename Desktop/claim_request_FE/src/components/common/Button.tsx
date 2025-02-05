import { ButtonProps } from "../../types/button.type";

export const Button: React.FC<ButtonProps> = ({
  border,
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
      onClick={onClick}
      style={{ border, color, backgroundColor, borderRadius, padding, margin }}
    >
      {name}
    </button>
  );
};
