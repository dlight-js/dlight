import { View } from "@dlightjs/dlight"
import { tag } from "@dlightjs/types"

export function lazy(importFunc: () => Promise<any>, fallback?: any) {
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
          .forwardProps()
      } else if (fallback) {
        tag(fallback)()
      }
    }
  } as any
}
