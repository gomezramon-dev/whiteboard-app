import { type ResizeEventType } from "@utils/observer/ResizeSubject";

export class ResizeObserver {
  private setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(setIsResizing: React.Dispatch<React.SetStateAction<boolean>>) {
    this.setIsResizing = setIsResizing;
  }

  update(eventType: ResizeEventType) {
    if (eventType === "start") {
      this.setIsResizing(true);
    } else if (eventType === "end") {
      this.setIsResizing(false);
    }
  }
}
