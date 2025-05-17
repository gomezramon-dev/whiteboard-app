import type IShape from "@interfaces/Shape";

export class ColorDecorator<
  Opts extends { fillStyle?: string; strokeStyle?: string },
> implements IShape<Opts>
{
  constructor(
    private wrapped: IShape<Opts>,
    private color: string,
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    // Sólo setea las props de color, preservando el resto
    this.wrapped.setOptions({
      fillStyle: this.color,
      strokeStyle: this.color,
    } as Partial<Opts>);
    this.wrapped.draw(ctx);
  }

  setOptions(opts: Partial<Opts>) {
    this.wrapped.setOptions(opts);
  }
}
