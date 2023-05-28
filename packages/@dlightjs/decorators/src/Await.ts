
export const Await = (value: any, dlScope?: any, propName?: any): any => {
  // ---- 一个参数认为是defaultValue，两个认为是value, setValue
  const defaultValue = dlScope ? undefined : value
  const awaitFunc = (v: any, dlScope: any, propName: any) => {
    v.then((d: any) => {
      dlScope[propName] = d
    })
    return defaultValue
  }
  return defaultValue ? awaitFunc : awaitFunc(value, dlScope, propName)
}
