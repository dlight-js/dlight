import DLight, { View } from "@dlightjs/dlight"

class App extends View {
  @Prop count

  Body() {
    div(`shit${this.count}`)
    div(`fuck${this.count}`)
    button("")
      .onclick(() => {
        this.count++
      })
  }
}

export default App
