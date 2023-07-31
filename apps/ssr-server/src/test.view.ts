import { View } from "@dlightjs/dlight"
import OkView from "./ok.view"

class App extends View {
  count = 0
  Body() {
    button("+")
      .onclick(() => {
        this.count++
      })
      .onmouseover(() => {
        console.log("over")
      })
    div(this.count)
    OkView()
      .count(this.count)
    OkView()
      .count(this.count)
  }
}

export default App
