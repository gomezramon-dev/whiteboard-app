import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="absolute bg-main-color inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="bg-white-color border-4 border-black-color rounded-2xl shadow-block p-8 text-center text-4xl 
   md:text-6xl font-russo-one"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
