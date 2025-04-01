import React from "react";
import { motion } from "framer-motion";

const FireworkEffect: React.FC = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {particles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 80;
        const colors = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              backgroundColor: color,
              boxShadow: `0 0 4px 1px ${color}80`,
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FireworkEffect;
