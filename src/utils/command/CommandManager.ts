import type ICommand from "@interfaces/Command";

export class CommandManager {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];

  execute(cmd: ICommand) {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = [];
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.undoStack.push(cmd);
  }
}
