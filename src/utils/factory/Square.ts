import type IShape from "@interfaces/Shape";

export interface SquareOptions {
  x: number;
  y: number;
  length: number;
  fillStyle?: string;
  strokeStyle?: string;
}

export class Square implements IShape {
  private opts: SquareOptions;
  constructor(opts: SquareOptions) {
    this.opts = opts;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, length, fillStyle, strokeStyle } = this.opts;
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, length, length);
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.strokeRect(x, y, length, length);
    }
  }

  setOptions(opts: Partial<SquareOptions>) {
    this.opts = { ...this.opts, ...opts };
  }
}
