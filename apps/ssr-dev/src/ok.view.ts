import { type CustomNode, View } from "@dlightjs/dlight"
import { type Typed, button, div, required, type RequiredProp, Prop, _ } from "@dlightjs/types"
class App extends View {
  @Prop count: RequiredProp<number> = required
  @Prop decrease: RequiredProp<() => any> = required

  Body() {
    div()
    {
      div(`shit${this.count}`)
      div(`fuck${this.count}`)
        .className(`${this.count}`)
        .id(`${this.count}`)
        .className("shit")

      button("--")
        .onclick(this.decrease)
    }

    // `nono ${this.count}`
  }
}

export default App as any as Typed<App>
