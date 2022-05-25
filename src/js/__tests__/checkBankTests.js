import checkBank from '../checkBank';

test.each([
  ['4929835210176292', 'visa'],
  ['5560926023552349', 'master'],
  ['3537238042693897', 'jcb'],
  ['2201936399273077', 'mir'],
  ['123', false],
  ['929835210176', false],
  ['72312342693897', false],
])('check banks', (obj, expected) => {
  const result = checkBank(obj);
  expect(result).toBe(expected);
});
