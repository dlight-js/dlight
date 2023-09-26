import { type CustomNode, View } from "@dlightjs/dlight"
import { type Typed, div } from "@dlightjs/types"
import T from "./T.view"
import { lazy } from "@dlightjs/components"

const TT = lazy(async() => await import("./T.view"))

class App extends View {
  a = false
  willMount(_els: HTMLElement[], _node: CustomNode): void {
    setTimeout(() => {
      this.a = true
    }, 1000)
  }

  Body() {
    div("hello dlight")
    if (this.a) {
      TT()
        .aa("10fuck0")
    }
  }
}

export default App as any as Typed<App>
