import React, { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const ProcessStep = ({
  number,
  title,
  description,
  color,
  onHover,
  onLeave,
  isActive,
}: {
  number: number;
  title: string;
  description: string;
  color: string;
  onHover: () => void;
  onLeave: () => void;
  isActive: boolean;
}) => {
  const circleControls = useAnimation();

  React.useEffect(() => {
    if (isActive) {
      circleControls.start({
        rotate: [0, 360],
        scale: [1, 1.15, 1.1],
        transition: {
          rotate: { duration: 1, ease: "easeInOut" },
          scale: { duration: 1, ease: "easeInOut" },
        },
      });
    } else {
      circleControls.start({
        rotate: 0,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [isActive, circleControls]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${color} z-10 text-2xl font-bold text-white`}
        animate={circleControls}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <span className="select-none">{number}</span>
      </motion.div>

      <h3 className="mt-4 text-center text-xs font-bold text-white sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 text-center text-xs text-gray-300">{description}</p>
    </div>
  );
};

export default function WorkingProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);

  const colors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-sky-500",
  ];

  const handleHover = (step: number) => {
    setActiveStep(step);
    setAnimatingStep(step);
  };

  const handleLeave = () => {
    setActiveStep(null);
  };

  return (
    <section className="w-full bg-[#2d3142] py-16 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-5xl font-bold">
          Our Working Process
        </h1>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute top-0 left-0 z-10 flex h-16 w-full">
            <div
              className="relative flex-1 cursor-pointer"
              onMouseEnter={() => handleHover(1)}
              onMouseLeave={handleLeave}
            ></div>
            <div
              className="relative flex-1 cursor-pointer"
              onMouseEnter={() => handleHover(2)}
              onMouseLeave={handleLeave}
            ></div>
            <div
              className="relative flex-1 cursor-pointer"
              onMouseEnter={() => handleHover(3)}
              onMouseLeave={handleLeave}
            ></div>
            <div
              className="relative flex-1 cursor-pointer"
              onMouseEnter={() => handleHover(4)}
              onMouseLeave={handleLeave}
            ></div>
          </div>

          <div className="absolute top-8 left-0 flex h-1 w-full">
            <div className="relative flex-1">
              <div className="h-full w-full bg-rose-500 opacity-30"></div>
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-rose-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%", transition: { duration: 0.5 } }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex-1">
              <div className="h-full w-full bg-amber-500 opacity-30"></div>
              <AnimatePresence>
                {activeStep === 2 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-amber-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%", transition: { duration: 0.5 } }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex-1">
              <div className="h-full w-full bg-emerald-500 opacity-30"></div>
              <AnimatePresence>
                {activeStep === 3 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%", transition: { duration: 0.5 } }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex-1">
              <div className="h-full w-full bg-sky-500 opacity-30"></div>
              <AnimatePresence>
                {activeStep === 4 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-sky-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%", transition: { duration: 0.5 } }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <ProcessStep
              number={1}
              title="Employee Completes Overtime Work"
              description="Logs extra hours worked."
              color={colors[0]}
              onHover={() => handleHover(1)}
              onLeave={handleLeave}
              isActive={activeStep === 1}
            />

            <ProcessStep
              number={2}
              title="Submit Overtime Claim Form"
              description="Fills out a claim form for OT compensation."
              color={colors[1]}
              onHover={() => handleHover(2)}
              onLeave={handleLeave}
              isActive={activeStep === 2}
            />

            <ProcessStep
              number={3}
              title="Await Approval of Overtime Claim"
              description="Submits claim form to the manager or HR for approval."
              color={colors[2]}
              onHover={() => handleHover(3)}
              onLeave={handleLeave}
              isActive={activeStep === 3}
            />

            <ProcessStep
              number={4}
              title="Receive Overtime Compensation"
              description="Logs extra hours worked."
              color={colors[3]}
              onHover={() => handleHover(4)}
              onLeave={handleLeave}
              isActive={activeStep === 4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
