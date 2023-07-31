import { View } from "@dlightjs/dlight-client"


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
  }
}

export default App
