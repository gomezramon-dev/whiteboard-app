import { useState, useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bufferSize, setBufferSize] = useState({
    width: 0,
    height: 0,
  });

  /**
   * * Redimensionar:
   * * - Toma referencia del elemento Canvas del DOM
   * *    - Si no existe referencia, se termina el useEffect
   * * - Crea un objeto ResizeObserver, que por cada entrada actualiza el tamaño del CSS
   * *    - Se calcula un nuevo valor de densidad de pixeles.
   * *    - Se calcula el nuevo tamaño del canvas; producto del tamaño de la entry con la densidad de pixeles.
   * *    - Se actualiza la densidad de pixeles.
   * *        - Si el estado anterior es el mismo que el actual, se regresa el anterior
   * *    - Se actualiza el tamaño del canvas
   * *        - Si el estado anterior es el mismo que el actual, se regresa el anterior
   * * - Tal objeto se le relaciona con la referencia del Canvas
   * * - El ResizeObserver se deslinda del Canvas una vez se haya desmontado el componente
   */
  const resizeHandler: ResizeObserverCallback = (entries) => {
    const entry = entries[0];

    const newDevicePixelRatio = window.devicePixelRatio || 1;

    const calculatedBufferWidth = Math.floor(
      entry.contentRect.width * newDevicePixelRatio,
    );
    const calculatedBufferHeight = Math.floor(
      entry.contentRect.height * newDevicePixelRatio,
    );

    setBufferSize((prevBufferSize) => {
      if (
        prevBufferSize.width !== calculatedBufferWidth ||
        prevBufferSize.height !== calculatedBufferHeight
      ) {
        return {
          width: calculatedBufferWidth,
          height: calculatedBufferHeight,
        };
      }

      return prevBufferSize;
    });
  };

  useEffect(() => {
    const canvasElementForResize = canvasRef.current;
    if (!canvasElementForResize) return;

    const resizeObserver = new ResizeObserver(resizeHandler);

    resizeObserver.observe(canvasElementForResize);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * * Dibuja:
   * * - Toma referencia del elemento Canvas del DOM
   * *    - Si no existe referencia, se termina el useEffect
   * * - Obtiene el contexto 2D del canvas para empezar a dibujar
   * *    - Si no existe contexto, se termina el useEffect
   * * - Si no existe largo ni alto en el canvas, o la pantalla se está renderizando se termina el useEffect.
   * *   No vale la pena renderizar algo que no existe.
   * * - Empieza a dibujar.
   */
  useEffect(() => {
    const canvasElementForDraw = canvasRef.current;
    if (!canvasElementForDraw) return;

    const ctx = canvasElementForDraw.getContext("2d");
    if (!ctx) return;

    const currentDevicePixelRatio = window.devicePixelRatio || 1;
    ctx.resetTransform?.();
    ctx.clearRect(0, 0, bufferSize.width, bufferSize.height);
    ctx.scale(currentDevicePixelRatio, currentDevicePixelRatio);
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  }, [bufferSize]);

  return (
    <canvas
      className="bg-white-color border-4 border-black-color rounded-2xl shadow-block flex-1 w-full"
      ref={canvasRef}
      width={bufferSize.width}
      height={bufferSize.height}
    />
  );
};

export default CanvasComponent;
