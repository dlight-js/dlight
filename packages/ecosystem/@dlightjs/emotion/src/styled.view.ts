import DLight, { View } from "@dlightjs/dlight"
import { htmlTag, tag } from "@dlightjs/types"
import { css } from "@emotion/css"
import { type Styled } from "./types"

export const styled: Styled = (<G>(innerTag: G) =>
  function<T={}>(strings: any, ...args: Array<(props: T) => string>) {
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

        didMount() {
          (this as any)._$el = (this as any)._$el[0]
        }

        Body() {
          htmlTag(innerTag)()
            .forwardProps(true)
            .do(node => { getStyles(node, this) })
        }
      } as any
    }
    return class Styled extends View {
      // @ts-ignore
      _$forwardProps = true

      Body() {
        tag(innerTag)()
          .forwardProps(true)
          .element(el => {
            (this as any)._$el = el
          })
          .do(node => { getStyles(node, this) })
      }
    } as any
  }) as any
