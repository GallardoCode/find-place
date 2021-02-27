interface ResultButtonData {
  onClick?: () => void
  text: string
  classList?: string[]
}

export default class ResultButton {
  private button: HTMLButtonElement

  constructor(private data: ResultButtonData) {
    this.button = document.createElement('button')
    this.render()
    this.configure()
  }

  configure(): void {
    this.button.addEventListener('click', this.onClickHandler)
  }

  onClickHandler = (): void => {
    if (this.data.onClick) {
      this.data.onClick()
    }
  }

  render(): void {
    const { text, classList } = this.data
    this.button.textContent = text
    if (classList) {
      this.button.classList.add(...classList)
    }
  }

  element(): HTMLButtonElement {
    return this.button
  }
}
