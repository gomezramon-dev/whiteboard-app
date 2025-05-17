export default interface IShape<Opts extends object = object> {
  draw(ctx: CanvasRenderingContext2D): void;
  setOptions(opts: Partial<Opts>): void;
}
