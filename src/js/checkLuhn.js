export default function checkLuhn(value) {
  let ch = 0;
  const num = value;
  const isOdd = num.length % 2 !== 0;

  if (value.length < 12) return false;

  for (let i = 0; i < num.length; i += 1) {
    const n = parseInt(num[i], 10);
    const nSquared = n * 2;

    ch += (isOdd || 0) === (i % 2) && (nSquared) > 9 ? (n - 9) : n;
  }

  return (ch % 10) === 0;
}
