import { View } from "@dlightjs/dlight"
import { button, div } from "@dlightjs/types"
import OkView from "./ok.view"

class App extends View {
  count = 33

  add() {
    this.count++
  }

  Body() {
    button("+")
      .onclick(() => {
        this.count++
      })
    // div()
    // {
      // div()
      // {
      //   div(this.count);
      //   `${this.count}`
      // }
    div()
    {
      OkView()
        .count(this.count)
        .increase(this.add)
    }

    // }
    // OkView()
    //   .count(this.count + 1000)
    //   .increase(this.add)
    // {
    //   div(this.count)
    //     .style({
    //       color: "blue"
    //     })
    // }
  }
}

export default App
