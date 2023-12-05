export function uid(length = 4) {
  return Math.random().toString(32).slice(2, length + 2)
}
