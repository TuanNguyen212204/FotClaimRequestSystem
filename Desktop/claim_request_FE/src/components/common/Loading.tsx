import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Loading.module.css"; 
import { ImSpinner3 } from "react-icons/im";
const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            className={styles.loader}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.4 } }}
            exit={{ scale: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              className={styles.spinner}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <ImSpinner3 />
            </motion.div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
