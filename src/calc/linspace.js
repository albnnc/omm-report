module.exports = (min, max, n) => {
  if (typeof n === 'undefined') {
    n = Math.max(Math.round(max - min) + 1, 1);
  }

  if (n < 2) {
    return n === 1 ? [min] : [];
  }

  n--;
  const result = Array(n);
  for (let i = n; i >= 0; i--) {
    result[i] = (i * max + (n - i) * min) / n;
  }
  return result;
};
