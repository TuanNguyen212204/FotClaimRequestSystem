import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingContext";
import styles from "./Loading.module.css";
import { GiSpinningSword } from "react-icons/gi";

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            className={styles.loader}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Spinner Animation */}
            <motion.div
              className={styles.spinner}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              <GiSpinningSword />
            </motion.div>

            {/* Loading Text & Dots */}
            <div className="flex gap-3.5 ml-0.5">
              <motion.div
                className={styles.loadingText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Loading
              </motion.div>

              <motion.div className={styles.loadingContainer}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={styles.loadingDot}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
