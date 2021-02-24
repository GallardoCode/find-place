import { Observer, Subject } from './observer'

export class ElementToggler implements Observer {
  private element: HTMLElement

  private classList: string[] | never[]

  constructor(elementID: string, classList: string[] | never[]) {
    const el = document.getElementById(elementID)
    if (el) {
      this.element = el
    } else {
      throw Error(`Couldn't find element: ${el}`)
    }
    this.classList = classList
  }

  onNotify(s: Subject): void {
    // eslint-disable-next-line dot-notation
    if (s['notify']) {
      this.toggleClasses()
    }
  }

  addClasses(classes: string[]): string[] {
    const classList = [...this.classList]
    if (classList.length > 0) {
      const missingClasses = classes.filter((cl) => !classList.includes(cl))
      this.classList = [...classList, ...missingClasses]
      return missingClasses
    }
    this.classList = classList
    return classList
  }

  removeClasses(classes: string[]): string[] {
    const classList = [...this.classList]
    if (classList.length > 0) {
      // classes that are already in the elment
      const existingClasses = classes.filter((cl) => classList.includes(cl))
      // remaining classes in the element after removing
      const remainingClasses = classList.filter((cl) => existingClasses.includes(cl))
      this.classList = remainingClasses
      // return classes removed
      return existingClasses
    }
    return []
  }

  toggleClasses(): void {
    this.classList.forEach((v) => this.element.classList.toggle(v))
  }
}

export function createElementToggler(elementID: string, classList: string[] | never[]): ElementToggler {
  return new ElementToggler(elementID, classList)
}
