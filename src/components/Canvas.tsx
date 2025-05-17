import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  ShapeFactory,
  type ShapeType,
  type ShapeOptions,
} from "@utils/factory/ShapeFactory";
import { CanvasModel } from "@utils/command/CanvasModel";
import { CommandManager } from "@utils/command/CommandManager";
import { DrawCommand } from "@utils/command/DrawCommand";
import { ColorDecorator } from "@utils/decorators/ColorDecorator";

interface CanvasProps {
  tool: ShapeType | "delete";
  color: string;
}

const CanvasComponent: React.FC<CanvasProps> = ({ tool, color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const model = useRef(new CanvasModel()).current;
  const history = useRef(new CommandManager()).current;
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);

    setSize((prev) =>
      prev.width !== w || prev.height !== h ? { width: w, height: h } : prev,
    );
  }, []);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    contextRef.current = ctx;

    const dpr = window.devicePixelRatio || 1;
    ctx.resetTransform?.();
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.scale(dpr, dpr);
  }, [size]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;

      if (!e.shiftKey && key === "z") {
        e.preventDefault();
        history.undo();
      }

      if (key === "y" || (e.shiftKey && key === "z")) {
        e.preventDefault();
        history.redo();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [history]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = contextRef.current;
    const canvasElement = canvasRef.current;
    if (!ctx || !canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "delete") {
      ctx.resetTransform?.();
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      return;
    }

    let opts: ShapeOptions;
    switch (tool) {
      case "circle":
        opts = { x, y, radius: 30 };
        break;
      case "square":
        opts = { x: x - 25, y: y - 25, length: 50 };
        break;
      case "line":
        opts = {
          x1: x - 30,
          y1: y - 30,
          x2: x + 30,
          y2: y + 30,
          length: Math.hypot(600, 600),
        };
        break;
      default:
        return;
    }

    const shape = ShapeFactory.create(tool, opts);
    const coloredShape = new ColorDecorator(shape, color);
    coloredShape.draw(ctx);
    const cmd = new DrawCommand(coloredShape, ctx, model);
    history.execute(cmd);
  };

  return (
    <canvas
      className="bg-white-color border-4 border-black-color rounded-2xl shadow-block flex-1 w-full"
      ref={canvasRef}
      width={size.width}
      height={size.height}
      onClick={handleClick}
    />
  );
};

export default CanvasComponent;
