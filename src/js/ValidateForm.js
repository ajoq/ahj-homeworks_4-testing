import checkBank from './checkBank';
import checkLuhn from './checkLuhn';

export default class ValidateForm {
  constructor() {
    this.form = document.getElementById('form');
    this.cards = Array.from(document.querySelectorAll('.cards-item'));
    this.formInput = document.getElementById('card-number');
    this.tooltip = document.querySelector('.tooltip');
    this.luhnSucces = document.querySelector('.luhn-succes');
    this.luhnError = document.querySelector('.luhn-error');
    this.noBankError = document.querySelector('.no-bank');
    this.events();
  }

  events() {
    this.formInput.addEventListener('input', (e) => this.checkInput(e));
    this.form.addEventListener('submit', (e) => this.formSubmit(e));
  }

  checkCardNumber(value) {
    if (Number.isNaN(Number(value))) {
      this.showNumCheckError();
      return false;
    }

    return value;
  }

  checkInput(e) {
    const num = e.target.value.replace(/ /g, '');
    this.clearMessages();
    this.clearCardStyles();
    if (num === '') return;
    this.showBank(checkBank(num));
    this.checkCardNumber(num);
  }

  checkLuhnDom(func) {
    if (func) {
      this.luhnSucces.classList.add('display');
    } else {
      this.luhnError.classList.add('display');
    }
  }

  clearCardStyles() {
    this.cards.forEach((item) => {
      item.classList.remove('cards-opacity');
    });
  }

  clearMessages() {
    this.luhnSucces.classList.remove('display');
    this.luhnError.classList.remove('display');
    this.tooltip.classList.remove('display');
    this.noBankError.classList.remove('display');
  }

  formSubmit(e) {
    e.preventDefault();
    this.clearMessages();

    const num = this.formInput.value.replace(/ /g, '');

    if (!this.checkCardNumber(num)) return;

    this.checkLuhnDom(checkLuhn(num));

    if (!this.showBank(checkBank(num))) {
      this.showNoBankError();
    }
  }

  showBank(bankName) {
    this.cards.forEach((item) => {
      item.classList.add('cards-opacity');
    });

    if (!bankName) return false;

    document.querySelector(`.${bankName}`).closest('.cards-opacity').classList.remove('cards-opacity');

    return true;
  }

  showNoBankError() {
    this.noBankError.classList.add('display');
  }

  showNumCheckError() {
    this.tooltip.classList.add('display');
  }
}
