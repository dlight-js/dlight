import { View, Prop } from "@dlightjs/dlight"
import { button, div } from "@dlightjs/types"
class App extends View {
  @Prop count: number = null as any
  @Prop decrease: () => any = null as any

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

export default App as any
