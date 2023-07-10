export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape
