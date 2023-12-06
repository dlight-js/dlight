
/**
 * @brief Generate a random string
 * @param length
 * @returns random string
 */
export function uid(length = 4): string {
  return Math.random().toString(32).slice(2, length + 2)
}
