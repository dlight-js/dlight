import { View, update } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  button,
  ForwardProps,
  Prop,
  Watch,
  required,
  div,
  tbody,
} from "@dlightjs/types"
import { Button } from "./Button100.view"

// interface Data {
//   count: number
//   arr: number[]
// }

@View
class App {
  rows = []
  View() {
    button("+").onClick(() => {
      this.rows.push(this.rows.length)
    })
    button("-").onClick(() => {
      this.rows.pop()
    })
    for (const [idx, row] of Object.entries(this.rows)) {
      key: idx
      div(row)
    }
  }
}

export default App
