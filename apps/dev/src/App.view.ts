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
  insertChildren,
  use,
} from "@dlightjs/dlight"

@View
class JJ {
  @Children no
  ok = {
    count: 1,
    view: this.no,
  }
  willMount() {
    this.ok.view = this.no
  }

  Body() {
    if (this.ok.count > 0) {
      this.ok.view
    }
    button("ok").onClick(() => {
      this.ok.count++
    })
  }
}
@View
class Fuck {
  willMount() {
    console.log("inin")
  }
  Body() {
    "jjjj"
  }
}

@View
@Main
class App {
  Body() {
    JJ()
    {
      Fuck()
    }
  }
}

export default App
