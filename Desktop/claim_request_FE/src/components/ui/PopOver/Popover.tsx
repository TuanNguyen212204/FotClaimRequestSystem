import { PopOverProps } from "./PopOver.types";
import styles from "./Placement.module.css";
import { usePopOver } from "@Hooks/usePopper";
const PopOver: React.FC<PopOverProps> = ({
  placement,
  trigger,
  open,
  onOpenChange,
  children,
  content,
  title,
  bgColour,
  z_index = "111",
  style,
}) => {
  const { containerRef, popperRef, isOpen, eventHandlers, placementClass } =
    usePopOver({
      placement,
      trigger,
      open,
      onOpenChange,
    });
  //TODO:Them mot offset props
  return (
    <div ref={containerRef} className="relative inline-block box-border">
      <div {...eventHandlers}>{children}</div>
      {isOpen && (
        <div
          ref={popperRef}
          className={`min-w-44 box-border ${placementClass}`}
          style={{ zIndex: Number(z_index) }}
        >
          <div
            className={`text-left p-3 flex flex-col rounded-md shadow-sm shadow-gray-300 text-xs font-normal text-gray-800 ${styles.animate_popIn}`} // hmm inline css co bi gi ko ta
            style={{ backgroundColor: bgColour || "#fff", ...style }}
          >
            {title && <div className="mb-2">{title}</div>}
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopOver;
