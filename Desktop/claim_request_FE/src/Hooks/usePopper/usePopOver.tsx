import { useState, useRef, useEffect } from "react";
import { UsePopOverProps, UsePopOverReturn } from "./usePopperProps";
import styles from "@components/ui/PopOver/Placement.module.css";
import { placement } from "@/components/ui/PopOver/PopOver.types";
const getPlacementClass = (placement: placement) => {
  const className = `placement-${placement.replace("-", "_")}`;
  return styles[className]; //tra ve cai class tuong ung voi placement code cubg
};
export const usePopOver = ({
  placement,
  trigger,
  open,
  onOpenChange,
}: UsePopOverProps): UsePopOverReturn => {
  const containerRef = useRef<HTMLDivElement>(null); //check xem co click ra ngoai khong
  const popperRef = useRef<HTMLDivElement>(null); //TODO: IMPLEMENT ME

  const [insiderOpen, setInsiderOpen] = useState<boolean>(open ?? false); //controller vs uncontrolled

  const isOpen = open !== undefined ? open : insiderOpen;

  const placementClass = getPlacementClass(placement);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (trigger === "click" || trigger === "focus") {
          if (onOpenChange) {
            onOpenChange(false);
          } else {
            setInsiderOpen(false);
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); //remove event listener wget unbmount
    };
  }, [trigger, onOpenChange]);

  const eventHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => onOpenChange?.(true) || setInsiderOpen(true),
          onMouseLeave: () => onOpenChange?.(false) || setInsiderOpen(false),
        }
      : trigger === "click"
      ? {
          onClick: () =>
            onOpenChange?.(!insiderOpen) || setInsiderOpen(!insiderOpen),
        }
      : trigger === "focus"
      ? {
          onFocus: () => onOpenChange?.(true) || setInsiderOpen(true),
          onBlur: () => onOpenChange?.(false) || setInsiderOpen(false),
        }
      : {};
  return {
    containerRef, // de check xem co click ra ngoai khong
    popperRef, // de danh cho getBoundingClientRect implement sau
    isOpen, // de render ra cai popper
    eventHandlers, // de xu ly su kien toa ra
    placementClass, // de render ra cai class tuong ung voi placement
  };
};
