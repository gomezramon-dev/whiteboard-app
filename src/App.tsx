import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CanvasComponent from "@components/Canvas";
import useDebounce from "@utils/useDebounce";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const incrementKey = useCallback(() => setCanvasKey((k) => k + 1), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  const debouncedKey = useDebounce(incrementKey, 200);
  const debouncedLoadingOff = useDebounce(stopLoading, 500);

  useEffect(() => {
    const handleResize = () => {
      setIsLoading(true);
      debouncedKey();
      debouncedLoadingOff();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      debouncedKey.cancel();
      debouncedLoadingOff.cancel();
    };
  }, [debouncedKey, debouncedLoadingOff]);

  return (
    <>
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
      <div className="flex flex-col p-12 min-h-screen">
        <div
          className="bg-white-color border-4 border-black-color rounded-2xl shadow-block 
        mb-8 h-32"
        ></div>
        <CanvasComponent key={canvasKey} />
      </div>
    </>
  );
};

export default App;
