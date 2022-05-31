/**
 * @jest-environment jsdom
 */

import CheckCardFormWidget from './CheckCardFormWidget';

test.each([
  ['4929835210176292', true],
  ['5560926023552349', true],
  ['3537238042693897', true],
  ['123', false],
  ['4929835210176', false],
  ['35372312342693897', false],
])('validate input each', (obj, expected) => {
  document.body.innerHTML = '<div class="validate-form"></div>';
  const div = document.querySelector('.validate-form');

  const widget = new CheckCardFormWidget(div);
  widget.bindToDOM();

  const input = div.querySelector(CheckCardFormWidget.inputSelector);

  input.value = obj;

  const submit = div.querySelector(CheckCardFormWidget.submitSelector);
  submit.click();

  const succes = div.querySelector('.luhn-succes');

  expect(succes.classList.contains('display')).toBe(expected);
});
