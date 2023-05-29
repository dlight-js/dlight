import { View } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { htmlTag, tag } from "@dlightjs/types"

export const styled: any = (innerTag: any) => <T = any>(strings: any, ...args: any) => {
  const getStyles = (node: any, scope: any) => {
    const keys = [...new Set(
      Object.getOwnPropertyNames(scope)
        .filter(m => scope[m] === "prop")
        .map(m => m.replace(/^_\$\$\$/, ""))
    )]

    node._$addProp("className", () => {
      const thisObject: T = {} as any
      for (const key of keys) {
        thisObject[key] = scope[`_$$${key}`]
      }
      let style = ""
      const strLength = Math.max(strings.length, args.length)
      for (const i of [...Array(strLength).keys()]) {
        if (strings[i]) style += strings[i]
        if (args[i]) {
          if (typeof args[i] === "function") {
            style += args[i](thisObject)
          } else {
            style += args[i]
          }
        }
      }
      return css`${style}`
    }, scope, keys)
  }
  if (typeof innerTag === "string") {
    return class Styled extends View {
      _$forwardProps = true
      // @ts-ignore
      @Prop _$content

      Afterset() {
        (this as any)._$el = (this as any)._$el[0]
      }

      Body() {
        htmlTag(innerTag)(this._$content)
          .forwardProps()
          .do((node: any) => { getStyles(node, this) })
      }
    } as any
  }
  return class Styled extends View {
    _$forwardProps = true

    Body() {
      tag(innerTag)()
        .forwardProps()
        .do((node: any) => { getStyles(node, this) })
    }
  } as any
}
