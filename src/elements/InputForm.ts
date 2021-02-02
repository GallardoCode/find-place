type AddressSubmit = (address: string) => void
export default class InputForm {
  private formElement: HTMLFormElement

  private addressField: HTMLInputElement

  constructor(formId: string, private onAddressSubmit: AddressSubmit) {
    this.formElement = document.getElementById(formId) as HTMLFormElement
    this.addressField = this.formElement.querySelector('#address') as HTMLInputElement
    this.configure()
  }

  configure(): void {
    this.formElement.addEventListener('submit', this.searchAddressHandler)
  }

  searchAddressHandler = (event: Event): void => {
    event.preventDefault()
    const enteredAddress = this.addressField.value
    this.onAddressSubmit(enteredAddress)
    this.clearSearch()
  }

  clearSearch = (): void => {
    this.addressField.value = ''
  }
}
