
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const AnimatedPage = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Outlet /> {/* This renders the nested routes */}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;
