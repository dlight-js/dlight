import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, type SubTyped } from "@dlightjs/types"

@View
class App {
  a = [
    { id: 1, label: "this is 1" },
    { id: 2, label: "this is 2" },
    { id: 3, label: "this is 3" },
    { id: 4, label: "this is 4" },
    { id: 5, label: "this is 5" },
    { id: 6, label: "this is 6" },
    { id: 7, label: "this is 7" },
    { id: 8, label: "this is 8" },
    { id: 9, label: "this is 9" }
  ]

  jj = []

  deleteOK = (id) => {
    return () => this.a = this.a.filter((item) => item.id !== id)
  }

  didMount() {
    console.log(this.jj)
  }

  Body() {
    for (const { id, label } of this.a) {
      [null]
      div(label)
      button("delete")
        .addEvents({
          click: this.deleteOK(id)
        })
        .style({
          fontSize: `${id * 10}px`
        })
        .element(holder => this.jj[id] = holder)
    }
  }
}

export default App as Pretty as Typed
