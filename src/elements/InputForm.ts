type AddressSubmit = (address: string)=>void;
export class InputForm {
  private formElement: HTMLFormElement
  private addressField: HTMLInputElement;

  constructor(formId: string, private onAddressSubmit: AddressSubmit) {
    this.formElement = document.getElementById(formId) as HTMLFormElement
    this.addressField = this.formElement.querySelector('#address') as HTMLInputElement
    this.configure()
  }

  configure(){
    this.formElement.addEventListener('submit', this.searchAddressHandler)
  }

  searchAddressHandler = (event: Event) => {
    event.preventDefault();
    const enteredAddress = this.addressField.value
    this.onAddressSubmit(enteredAddress)
    this.clearSearch();
  }

  clearSearch = () => {
    this.addressField.value = '';
  }
}