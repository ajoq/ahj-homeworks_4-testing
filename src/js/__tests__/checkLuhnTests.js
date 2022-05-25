import checkLuhn from '../checkLuhn';

test.each([
  ['4929835210176292', true],
  ['5560926023552349', true],
  ['3537238042693897', true],
  ['123', false],
  ['4929835210176', false],
  ['35372312342693897', false],
])('Luhn algorithm', (obj, expected) => {
  const result = checkLuhn(obj);
  expect(result).toBe(expected);
});
