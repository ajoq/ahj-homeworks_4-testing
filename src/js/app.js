import CheckCardFormWidget from './CheckCardFormWidget';

const validateForm = document.querySelector('.validate-form');
const widget = new CheckCardFormWidget(validateForm);
widget.bindToDOM();
