import { useState, useEffect, useRef } from "react";

interface CanvasSizeState {
  cssWidth: number;
  cssHeight: number;
}

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState<CanvasSizeState>({
    cssWidth: 0,
    cssHeight: 0,
  });
  const sizeRef = useRef(size);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    const canvasElementForResize = canvasRef.current;
    if (!canvasElementForResize) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          cssWidth: entry.contentRect.width,
          cssHeight: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(canvasElementForResize);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const currentDevicePixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const bufferWidth = Math.floor(size.cssWidth * currentDevicePixelRatio);
  const bufferHeight = Math.floor(size.cssHeight * currentDevicePixelRatio);

  useEffect(() => {
    if (bufferWidth === 0 || bufferHeight === 0) {
      return;
    }
    const canvasElementForDraw = canvasRef.current;
    if (!canvasElementForDraw) {
      return;
    }

    const ctx = canvasElementForDraw.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.resetTransform?.();
    ctx.clearRect(0, 0, bufferWidth, bufferHeight);
    ctx.scale(currentDevicePixelRatio, currentDevicePixelRatio);

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI); // Coordenadas en "píxeles CSS"
    ctx.fill();
  }, [bufferWidth, bufferHeight, currentDevicePixelRatio]);

  return (
    <canvas
      className="bg-white-color border-4 border-black-color rounded-2xl shadow-block flex-1 w-full"
      ref={canvasRef}
      width={bufferWidth}
      height={bufferHeight}
    />
  );
};

export default CanvasComponent;
