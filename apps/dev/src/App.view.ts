// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, button, p, span } from "@dlightjs/types"

@View
class App {
  count = 0
  arr = [{jj:0, id: 10}]

  @View
  ok({ id}) {
    div(`${this.count} ${id}`)
  }

  Body() {
    button("+")
      .onClick(() => {
        this.count++
      })
    button("change")
      .onClick(() => {
        this.arr = [{jj:0,id: this.arr[0].id + 1}]
      })
    for (const item of this.arr) { key: item.jj
      this.ok()
        .id(item.id)
    }
    
  }
}

export default App as Pretty as Typed

