import type IShape from "@interfaces/Shape";

export interface CircleOptions {
  x: number;
  y: number;
  radius: number;
  fillStyle?: string;
  strokeStyle?: string;
}

export class Circle implements IShape {
  private opts: CircleOptions;
  constructor(opts: CircleOptions) {
    this.opts = opts;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, fillStyle, strokeStyle } = this.opts;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();
    }
  }

  setOptions(opts: Partial<CircleOptions>) {
    this.opts = { ...this.opts, ...opts };
  }
}
