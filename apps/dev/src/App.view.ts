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

interface Data {
  count: number
  arr: number[]
}

@View
class App {
  data: Data = {
    count: 3,
    arr: [1, 2, 3],
  }

  View() {
    button("+").onClick(() => {
      this.data.count++
    })
    button("push").onClick(() => {
      this.data.arr.push(this.data.count)
    })

    div()
    {
      div()
      {
        div().didMount(() => {
          console.log("didMount")
        })
        {
          div()
          {
            div("ok")
          }
        }
      }
    }
    for (const i of this.data.arr) {
      div(i)
    }
  }
}

export default App
