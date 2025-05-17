import type IShape from "@interfaces/Shape";

export class CanvasModel {
  private shapes: IShape[] = [];
  get all() {
    return this.shapes;
  }
  add(shape: IShape) {
    this.shapes.push(shape);
  }
  remove(shape: IShape) {
    this.shapes = this.shapes.filter((s) => s !== shape);
  }
}
