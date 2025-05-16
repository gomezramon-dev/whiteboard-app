import type Observer from "@interfaces/Observer";

export default interface ISubject<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(payload: T): void;
}
