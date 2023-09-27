import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, type SubTyped } from "@dlightjs/types"

@View
class App {
  count = 0

  @View
    myButton = (({ content }: any) => {
      button(content)
    }) as any as SubTyped<{}>

  Body() {
    div("hello dlight")
    div(this.count)
    this.myButton("+")
      .onclick(() => {
        this.count++
      })
    this.myButton("-")
      .onclick(() => {
        this.count--
      })
  }
}

export default App as Pretty as Typed
