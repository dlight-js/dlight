import { View } from "@dlightjs/dlight"
import { a, button, div } from "@dlightjs/types"
import OkView from "./ok.view"

class App extends View {
  count = 33

  add() {
    this.count++
  }

  delete() {
    this.count--
  }

  Body() {
    div()
    {
      button("+")
        .onclick(() => {
          this.count++
        })
    }

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
        .decrease(this.delete);
      `jjj${this.count}`
    }
    div("click Div")
      .onclick(() => {
        console.log("wait, what")
      })
      .onmouseover(() => {
        console.log("Does hover work?")
      })
    a("hhh")
      .href("https://www.google.com")
    OkView()
      .count(this.count + 10000)
      .decrease(this.delete)

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
