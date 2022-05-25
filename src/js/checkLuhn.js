/* eslint-disable no-cond-assign */

export default function checkLuhn(value) {
  let ch = 0;
  const num = value;
  const isOdd = num.length % 2 !== 0;

  for (let i = 0; i < num.length; i += 1) {
    let n = parseInt(num[i], 10);

    ch += (isOdd || 0) === (i % 2) && (n *= 2) > 9 ? (n - 9) : n;
  }

  return (ch % 10) === 0;
}
