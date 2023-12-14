
type DLightErrMap = Record<number, string>
type ErrorMethod<T extends DLightErrMap, G extends string> = {
  [K in keyof T as `${G}${K & number}`]: (...args: string[]) => void
}

export function createErrorHandler<A extends DLightErrMap, B extends DLightErrMap, C extends DLightErrMap>(
  errorSpace: string,
  // @ts-expect-error
  throwMap: A = {},
  // @ts-expect-error
  errorMap: B = {},
  // @ts-expect-error
  warningMap: C = {}
) {
  function handleError(map: DLightErrMap, type: string, func: (msg: string) => void) {
    return Object.fromEntries(
      Object.entries(map).map(([code, msg]) => [`${type}${code}`, (...args: string[]) => {
        args.forEach((arg, i) => {
          msg = msg.replace(`$${i}`, arg)
        })
        return func(`:D - ${errorSpace}[${type}${code}]: ${msg}`)
      }])
    )
  }
  const methods: ErrorMethod<A, "throw"> & ErrorMethod<B, "error"> & ErrorMethod<C, "warn"> = {
    ...handleError(throwMap, "throw", (msg) => { throw new Error(msg) }),
    ...handleError(errorMap, "error", console.error),
    ...handleError(warningMap, "warn", console.warn)
  } as any

  function notDescribed(type: string) {
    return () => `:D ${errorSpace}: ${type} not described`
  }

  return {
    ...methods,
    throwUnknown: notDescribed("throw"),
    errorUnknown: notDescribed("error"),
    warnUnknown: notDescribed("warn")
  }
}
