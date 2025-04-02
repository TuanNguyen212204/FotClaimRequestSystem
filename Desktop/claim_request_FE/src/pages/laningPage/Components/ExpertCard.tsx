import React from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../Components/glowing-effect";
import FireworkEffect from "./FireworkEffect";

type ExpertCardProps = {
  name: string;
  image: string;
};

const ExpertCard: React.FC<ExpertCardProps> = ({ name, image }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const fireworkIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [fireworkKey, setFireworkKey] = React.useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setFireworkKey((prev) => prev + 1);

    fireworkIntervalRef.current = setInterval(() => {
      setFireworkKey((prev) => prev + 1);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (fireworkIntervalRef.current) {
      clearInterval(fireworkIntervalRef.current);
      fireworkIntervalRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      if (fireworkIntervalRef.current) {
        clearInterval(fireworkIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && <FireworkEffect key={fireworkKey} />}

        {isHovered && (
          <motion.div
            className="absolute -inset-1 z-0 rounded-full"
            style={{
              background: `
                conic-gradient(
                  #f43f5e 0deg 20deg,
                  rgba(244, 63, 94, 0.8) 20deg 30deg, 
                  #f59e0b 30deg 50deg, 
                  rgba(245, 158, 11, 0.8) 50deg 60deg, 
                  #10b981 60deg 80deg, 
                  rgba(16, 185, 129, 0.8) 80deg 90deg, 
                  #0ea5e9 90deg 110deg, 
                  rgba(14, 165, 233, 0.7) 110deg 120deg, 
                  rgba(14, 165, 233, 0.4) 120deg 130deg,
                  rgba(14, 165, 233, 0.2) 130deg 140deg,
                  transparent 140deg 360deg
                )
              `,
            }}
            animate={{
              rotate: 360,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{
              rotate: {
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 rounded-full bg-[#252937]"
              style={{
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>
        )}

        <motion.div
          className="relative z-10 h-24 w-24 overflow-hidden rounded-full bg-gray-300"
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
        >
          <div className="absolute inset-0 z-10">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={74}
              inactiveZone={0.01}
            />
          </div>

          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://www.gravatar.com/avatar/b0fe923fa5b4269a43eb12b0c0b35092?s=80&d=identicon";
            }}
          />
        </motion.div>
      </div>
      <p className="mt-4 text-center text-xl text-white">{name}</p>
    </div>
  );
};

export default ExpertCard;
