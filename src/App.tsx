import { useState, useEffect, useRef } from "react";
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
      100,
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeOutFunctionId.current) clearTimeout(timeOutFunctionId.current);
    };
  }, []);

  return (
    <div id="app" className="flex flex-col p-12 min-h-screen">
      <div className="bg-white-color border-4 border-black-color rounded-2xl shadow-block mb-8 h-32">
        Colors & Tools
      </div>
      <CanvasComponent isWindowResizing={isWindowResizing} />
    </div>
  );
};

export default App;
