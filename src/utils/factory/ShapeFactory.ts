import type IShape from "@interfaces/Shape";
import { Circle, type CircleOptions } from "@utils/factory/Circle";
import { Square, type SquareOptions } from "@utils/factory/Square";
import { Line, type LineOptions } from "@utils/factory/Line";

export type ShapeType = "circle" | "square" | "line";
export type ShapeOptions = CircleOptions | SquareOptions | LineOptions;

export class ShapeFactory {
  static create(type: ShapeType, opts: ShapeOptions): IShape {
    switch (type) {
      case "circle":
        return new Circle(opts as CircleOptions);
      case "square":
        return new Square(opts as SquareOptions);
      case "line":
        return new Line(opts as LineOptions);
      default:
        throw new Error(`Shape type "${type}" no reconocido`);
    }
  }
}
