export default interface IObserver<T> {
  update(payload: T): void;
}
