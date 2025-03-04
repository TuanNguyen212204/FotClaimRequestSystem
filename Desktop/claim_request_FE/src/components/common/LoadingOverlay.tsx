import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingContext";
import styles from "./Loading.module.css";
import { ImSpinner3 } from "react-icons/im";

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0 } }} 
          exit={{ opacity: 0, transition: { duration: 0 } }} 
        >
          <motion.div className={styles.loader}>
          
            <motion.div
              className={styles.spinner}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
              <ImSpinner3 />
            </motion.div>

        
          <div className="flex gap-3.5">
          <div className={styles.loadingText}>Loading</div>


<div className={styles.loadingContainer}>
  <motion.div className={styles.loadingDot} />
  <motion.div className={styles.loadingDot} />
  <motion.div className={styles.loadingDot} />
</div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
