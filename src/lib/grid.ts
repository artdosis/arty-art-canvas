/**
 * Pick a column count so the last row never looks lonely.
 * 4 items become 2 + 2, 5 become 3 + 2, 7 become 4 + 3, and so on.
 */
export function balanceCols(n: number, max = 3): number {
  if (n <= 1) return 1;
  if (n <= max) return n;
  let best = max;
  let bestScore = -Infinity;
  for (let c = 2; c <= max; c++) {
    const rows = Math.ceil(n / c);
    const last = n - (rows - 1) * c;
    // prefer full last rows, then wider layouts
    const score = (last === c ? 100 : last * 10 - (c - last) * 12) + c;
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

export function balancedStyle(n: number, max = 3) {
  return { "--cols": balanceCols(n, max) } as React.CSSProperties;
}
