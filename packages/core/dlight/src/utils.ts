export function arrayEqual<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return false
  return arr1.every((item, idx) => item === arr2[idx])
}
