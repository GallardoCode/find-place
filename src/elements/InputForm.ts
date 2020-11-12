export class InputForm {
  private formElement: HTMLFormElement
  private addressField: HTMLInputElement;

  constructor(formId: string) {
    this.formElement = document.getElementById(formId) as HTMLFormElement
    this.addressField = this.formElement.querySelector('#address') as HTMLInputElement
    this.configue()
  }

  configue(){
    this.formElement.addEventListener('submit', this.searchAddressHandler)
  }

  searchAddressHandler = (event: Event) => {
    event.preventDefault();
    const enteredAddress = this.addressField.value
    console.log(enteredAddress)
    this.clearSearch();
  }

  clearSearch = () => {
    this.addressField.value = '';
  }
}