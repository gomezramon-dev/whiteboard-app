import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CanvasComponent from "@components/Canvas";

const App = () => {
  const [isWindowResizing, setIsWindowsResizing] = useState(false);
  const timeOutFunctionId = useRef<NodeJS.Timeout | null>(null);

  /**
   * * Manejo del redimensionamiento de la ventana:
   * * - Define la función handleResize que:
   * *     - Limpia cualquier setTimeout previo para evitar múltiples ejecuciones pendientes.
   * *     - Establece el estado isWindowResizing a true.
   * *     - Inicia un nuevo setTimeout para regresar isWindowResizing a false después de 500ms.
   * * - Al montar el componente:
   * *     - Agrega un event listener al evento 'resize' del objeto window que llama a handleResize.
   * * - Al desmontar el componente:
   * *     - Remueve el event listener de 'resize' de window.
   * *     - Limpia cualquier timeout pendiente al desmontar para evitar efectos secundarios fuera del ciclo de vida.
   */
  const handleResize = () => {
    if (timeOutFunctionId.current) clearTimeout(timeOutFunctionId.current);

    setIsWindowsResizing(true);
    timeOutFunctionId.current = setTimeout(
      () => setIsWindowsResizing(false),
      300,
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeOutFunctionId.current) clearTimeout(timeOutFunctionId.current);
    };
  }, []);

  useEffect(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.classList.toggle("pause", isWindowResizing);
    app.classList.toggle("nopause", !isWindowResizing);
    return () => {
      app.classList.remove("gray", "nogray");
    };
  }, [isWindowResizing]);

  return (
    <>
      <AnimatePresence>
        {isWindowResizing && (
          <motion.div
            className="absolute bg-main-color inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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
      <div id="app" className="flex flex-col p-12 min-h-screen">
        <div
          className="bg-white-color border-4 border-black-color rounded-2xl shadow-block 
        mb-8 h-32"
        ></div>
        <CanvasComponent isWindowResizing={isWindowResizing} />
      </div>
    </>
  );
};

export default App;
