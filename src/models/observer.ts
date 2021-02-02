export interface Subject {
  addObserver(o: Observer): void
  removeObserver(o: Observer): void
  notify(): void
}
export interface Observer {
  onNotify(s: Subject): void
}
