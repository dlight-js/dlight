import { View } from "@dlightjs/dlight"
import { type Pretty, tag } from "@dlightjs/types"

/**
 * @example
 * ```js
 * import { lazy } from "@dlightjs/components"
 * const MyComp = lazy(() => import("./MyComp.view"))
 * ```
 */
export function lazy<T>(importFunc: () => Promise<{ default: T }>, fallback?: any) {
  return class extends View {
    v?: any
    _$forwardProps = true

    willMount() {
      void importFunc()
        .then((view: any) => {
          this.v = view.default
        })
    }

    Body() {
      if (this.v) {
        tag(this.v)()
          .forwardProps(true)
      } else if (fallback) {
        tag(fallback)()
      }
    }
  } as Pretty as T
}
