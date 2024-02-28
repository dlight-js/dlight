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
  View() {
    div(_View => {
      div("ok")
    }).style({
      color: "red",
    })
  }
}

export default App
