import { cn } from "./utils";
import { useEffect, useRef } from "react";
import { Lens } from "./lens";

type ImageItem = {
  src: string;
  alt: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: ImageItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );

      let duration = "40s";
      if (speed === "fast") {
        duration = "20s";
      } else if (speed === "slow") {
        duration = "80s";
      }
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [direction, speed]); 

  
  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
     
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4",
          
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
       
        {duplicatedItems.map((item, idx) => (
          <li
            className="h-40 w-auto shrink-0 shadow-md md:h-52" 
            key={`${item.alt}-${idx}`} 
          >
            <Lens
              className="h-full w-full"
              lensSize={100}
              zoomFactor={2}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-contain" 
              />
            </Lens>
          </li>
        ))}
       
      </ul>
    </div>
  );
};


