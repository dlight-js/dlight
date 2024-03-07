import {
  Children,
  Content,
  Main,
  Model,
  Prop,
  View,
  Watch,
  button,
  div,
  h1,
  h2,
  input,
  use,
} from "@dlightjs/dlight"

@View
class MyComp {
  model = use(ModelJ)

  ok = this.model.ok

  View() {
    button("reset").onClick(this.model.change)
    // div(this.aa.jj)
  }
}

@Model
class ModelJ {
  jj = { ok: 100 }
  // ok = this.jj.ok
  change() {
    this.jj = null
  }
}

@View
@Main
class App {
  arr = [1, 2, 3]
  count = 0

  Body() {
    div()
    {
      if (this.arr.length > 0) {
        div(`${this.count} ++ `)

        div()
        {
          for (const i of this.arr) {
            key: i
            div(i)
          }
        }
      }
    }

    button(this.count).onClick(() => {
      if (this.count === null) {
        this.count = 0
      }
      this.count++
    })
    button("reset").onClick(() => {
      this.count = null
    })
  }
}

export default App
