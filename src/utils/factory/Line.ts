import type IShape from "@interfaces/Shape";

export interface LineOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  strokeStyle?: string;
  lineWidth?: number;
}

export class Line implements IShape {
  constructor(private opts: LineOptions) {}

  draw(ctx: CanvasRenderingContext2D) {
    const { x1, y1, x2, y2, strokeStyle, lineWidth } = this.opts;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (lineWidth) {
      ctx.lineWidth = lineWidth;
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
    }

    ctx.stroke();
  }
}
