import debounce from "lodash/debounce";
import type ISubject from "@interfaces/Subject";
import type IObserver from "@interfaces/Observer";

export type ResizeEventType = "start" | "end";

class ResizeSubject implements ISubject<ResizeEventType> {
  private listeners = new Set<IObserver<ResizeEventType>>();
  private isResizing = false;
  private debounceEnd: () => void;

  constructor() {
    this.debounceEnd = debounce(() => {
      this.isResizing = false;
      this.notify("end");
    }, 300);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.handleResize, { passive: true });
    }
  }

  private handleResize = () => {
    if (!this.isResizing) {
      this.isResizing = true;
      this.notify("start");
    }
    this.debounceEnd();
  };

  public subscribe(observer: IObserver<ResizeEventType>): void {
    this.listeners.add(observer);
  }

  public unsubscribe(observer: IObserver<ResizeEventType>): void {
    this.listeners.delete(observer);
  }

  public notify(type: ResizeEventType): void {
    for (const observer of this.listeners) {
      try {
        observer.update(type);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
}

export const resizeSubject = new ResizeSubject();
