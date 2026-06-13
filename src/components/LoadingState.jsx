import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

const LoadingState = ({ message = "Procesando recomendaciones..." }) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-blue-800"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
    >
      <Spinner className="text-blue-700" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

export default LoadingState;
