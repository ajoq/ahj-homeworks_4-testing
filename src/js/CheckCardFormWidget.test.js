/**
 * @jest-environment jsdom
 */

import CheckCardFormWidget from './CheckCardFormWidget';

test('should render self', () => {
  document.body.innerHTML = '<div class="validate-form"></div>';
  const div = document.querySelector('.validate-form');

  const widget = new CheckCardFormWidget(div);
  widget.bindToDOM();

  expect(div.innerHTML).toEqual(CheckCardFormWidget.markup);
});
