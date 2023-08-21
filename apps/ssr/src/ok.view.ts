import { type CustomNode, View } from "@dlightjs/dlight"
import { type Typed, button, div, required, type RequiredProp, Prop, _ } from "@dlightjs/types"
class App extends View {
  @Prop count: RequiredProp<number> = required
  @Prop increase: RequiredProp<() => any> = required

  Body() {
    div()
    {
      div(`shit${this.count}`)
      div(`fuck${this.count}`)
    }

    button("++")
      .onclick(this.increase)

    // `nono ${this.count}`
  }
}

export default App as any as Typed<App>
