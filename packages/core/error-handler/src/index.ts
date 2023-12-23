type DLightErrMap = Record<number, string>
type ErrorMethod<T extends DLightErrMap, G extends string> = {
  [K in keyof T as `${G}${K & number}`]: (...args: string[]) => any
}

/**
 * @brief Create error handler by given error space and error maps
 *  e.g.
 *  const errHandler = createErrorHandler("DLight", {
 *    1: "Cannot find node type: $0, throw"
 *  }, {
 *    1: "This is an error: $0"
 *  }, {
 *    1: "It's a warning"
 *  })
 * errHandler.throw1("div") // -> throw new Error(":D - DLight[throw1]: Cannot find node type: div, throw")
 * errHandler.error1("div") // -> console.error(":D - DLight[error1]: This is an error: div")
 * errHandler.warn1() // -> console.warn(":D - DLight[warn1]: It's a warning")
 * @param errorSpace
 * @param throwMap
 * @param errorMap
 * @param warningMap
 * @returns Error handler
 */
export function createErrorHandler<
  A extends DLightErrMap,
  B extends DLightErrMap,
  C extends DLightErrMap,
>(
  errorSpace: string,
  throwMap: A = {} as any,
  errorMap: B = {} as any,
  warningMap: C = {} as any
) {
  function handleError(
    map: DLightErrMap,
    type: string,
    func: (msg: string) => any
  ) {
    return Object.fromEntries(
      Object.entries(map).map(([code, msg]) => [
        `${type}${code}`,
        (...args: string[]) => {
          args.forEach((arg, i) => {
            msg = msg.replace(`$${i}`, arg)
          })
          return func(`:D - ${errorSpace}[${type}${code}]: ${msg}`)
        },
      ])
    )
  }
  const methods: ErrorMethod<A, "throw"> &
    ErrorMethod<B, "error"> &
    ErrorMethod<C, "warn"> = {
    ...handleError(throwMap, "throw", msg => {
      throw new Error(msg)
    }),
    ...handleError(errorMap, "error", console.error),
    ...handleError(warningMap, "warn", console.warn),
  } as any

  function notDescribed(type: string) {
    return () => `:D ${errorSpace}: ${type} not described`
  }

  return {
    ...methods,
    throwUnknown: notDescribed("throw"),
    errorUnknown: notDescribed("error"),
    warnUnknown: notDescribed("warn"),
  }
}
