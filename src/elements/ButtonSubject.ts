import { Observer, Subject } from '../models/observer'

export default class ButtonSubject implements Subject {
  private buttonElement: HTMLButtonElement

  private observers: Observer[] = []

  constructor(elementId: string) {
    const button = document.getElementById(elementId)
    if (button instanceof HTMLButtonElement) {
      this.buttonElement = button
    } else {
      throw Error('Elment is not a button')
    }
    this.buttonElement.addEventListener('click', this.onButtonClick)
  }

  onButtonClick = (): void => {
    this.notify()
  }

  addObserver(o: Observer): void {
    const isExist = this.observers.includes(o)
    if (isExist) {
      // eslint-disable-next-line no-console
      console.log('Subject: Observer has been attached already.')
    }
    this.observers.push(o)
  }

  removeObserver(o: Observer): void {
    const observerIndex = this.observers.indexOf(o)
    if (observerIndex === -1) {
      // eslint-disable-next-line no-console
      console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
  }

  notify(): void {
    this.observers.forEach((observer) => {
      observer.onNotify(this)
    })
  }
}
