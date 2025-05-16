import { useState, useEffect, useRef } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasSize = canvasElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const calculatedWidth = Math.floor(canvasSize.width * dpr);
    const calculatedHeight = Math.floor(canvasSize.height * dpr);

    setSize((prevSize) => {
      if (
        prevSize.width !== calculatedWidth ||
        prevSize.height !== calculatedHeight
      ) {
        return {
          width: calculatedWidth,
          height: calculatedHeight,
        };
      }

      return prevSize;
    });
  }, []);

  useEffect(() => {
    if (size.width === 0 || size.height === 0) return;

    const canvasElement = canvasRef.current!;
    if (!contextRef.current) {
      const c = canvasElement.getContext("2d");
      if (!c) return;
      contextRef.current = c;
    }

    const ctx = contextRef.current;

    ctx.resetTransform?.();
    ctx.clearRect(0, 0, size.width, size.height);
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  }, [size]);

  return (
    <canvas
      className="bg-white-color border-4 border-black-color rounded-2xl shadow-block flex-1 w-full"
      ref={canvasRef}
      width={size.width}
      height={size.height}
    />
  );
};

export default CanvasComponent;
