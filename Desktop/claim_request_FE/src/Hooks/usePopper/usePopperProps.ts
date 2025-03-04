import { placement, trigger } from "@/components/common/PopOver/PopOver.types";
type EventHandlers =
  | { onMouseEnter: () => void; onMouseLeave: () => void }
  | { onClick: () => void }
  | { onFocus: () => void; onBlur: () => void }
  | {};

export interface UsePopOverProps {
  placement: placement;
  trigger: trigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UsePopOverReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  popperRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  eventHandlers: EventHandlers;
  placementClass: string;
}
