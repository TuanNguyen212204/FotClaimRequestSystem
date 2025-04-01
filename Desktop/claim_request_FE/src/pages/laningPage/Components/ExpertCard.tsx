import React from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../Components/glowing-effect";

type ExpertCardProps = {
  name: string;
};

const ExpertCard: React.FC<ExpertCardProps> = ({ name }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative transform overflow-hidden rounded-full bg-gray-300 p-0 transition-transform duration-500 hover:scale-105">
        <div className="animate-pulseGlow absolute inset-0">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={74}
            inactiveZone={0.01}
          />
        </div>
        <div className="h-20 w-20 rounded-full bg-gray-300 from-indigo-500 via-purple-500 to-pink-500 transition duration-300 hover:bg-gradient-to-r sm:h-24 sm:w-24"></div>
      </div>

      {/* Expert Name with Hover Animation */}
      <motion.p
        className="mt-2 text-center text-sm text-white"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.p>
    </motion.div>
  );
};

export default ExpertCard;
