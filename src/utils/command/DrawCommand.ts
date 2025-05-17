import type IShape from "@interfaces/Shape";
import type ICommand from "@interfaces/Command";
import type { CanvasModel } from "@utils/command/CanvasModel";

export class DrawCommand implements ICommand {
  constructor(
    private shape: IShape,
    private ctx: CanvasRenderingContext2D,
    private model: CanvasModel,
  ) {}

  execute() {
    this.model.add(this.shape);
    this.redrawAll();
  }

  undo() {
    this.model.remove(this.shape);
    this.redrawAll();
  }

  private redrawAll() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.model.all.forEach((s) => s.draw(this.ctx));
  }
}
