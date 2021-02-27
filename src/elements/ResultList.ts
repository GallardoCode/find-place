import { mapQuery, MapQuery } from '../models/MapQuery'
import { Observer, Subject } from '../models/observer'
import ResultButton from './ResultButton'

interface MapResultListData {
  classList?: string[]
}

export default class MapResultList implements Observer {
  private listElement: HTMLDivElement

  constructor(private classList: MapResultListData) {
    this.listElement = document.createElement('div')
    this.render()
  }

  render(): void {
    this.clearChildNodes()
    const addresses = [...mapQuery.addresses]
    const buttonClasses = [
      'bg-gray-300',
      'md:rounded-md',
      'mb-1',
      'shadow-sm',
      'px-3',
      'md:px-2',
      'py-2',
      'md:py-1',
      'block',
    ]
    const listElements = addresses.map((result, index) => {
      const locationName = result.formatted_address
      const onClick = mapQuery.updateCurrent
      return new ResultButton({
        text: locationName,
        onClick: () => {
          onClick(index)
        },
        classList: buttonClasses,
      })
    })
    listElements.forEach((el) => this.listElement.appendChild(el.element()))
  }

  clearChildNodes(): void {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
  }

  get element(): HTMLDivElement {
    return this.listElement
  }

  onNotify(s: Subject): void {
    if (s instanceof MapQuery) {
      this.render()
    }
  }
}
