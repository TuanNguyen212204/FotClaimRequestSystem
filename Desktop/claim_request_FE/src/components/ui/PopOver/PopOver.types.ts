export type placement =
  | "top"
  | "right"
  | "left"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "right-top"
  | "right-bottom"
  | "left-top"
  | "left-bottom";
export type z_index = string;
export type arrow = boolean;
export type color = React.CSSProperties["backgroundColor"];
export type trigger = "hover" | "click" | "focus";
export interface PopOverProps {
  placement: placement;
  z_index?: z_index;
  title: string;
  content: React.ReactNode | string;
  bgColour?: color;
  trigger: trigger;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  arrow?: arrow;
  open?: boolean; // cai arrow hoi kho mat thoi gian lam tam thoi thieu arrow
  onOpenChange?: (open: boolean) => void;
}
