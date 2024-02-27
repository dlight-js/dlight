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
  @Prop shit
  View() {
    try {
      button("trigger").onClick(this.shit)
    } catch (e) {
      div(`error: ${e.message}`).style({
        color: "red",
      })
    }
  }
}

@View
class Update {
  @Content update
  @Children children
  View() {
    if (this.update) {
      this.children
    } else {
      this.children
    }
  }
}

@View
@Main
class App {
  msg = "error"
  shit() {
    console.log("jjj")
    // setTimeout(() => {
    throw new Error(this.msg)
    // }, 10)
  }
  update

  View() {
    input()
      .onInput(e => {
        this.msg = e.target.value
      })
      .value(this.msg)
    button("reset").onClick(() => {
      this.update = !this.update
    })
    Update(this.update)
    {
      MyComp().shit(this.shit)
    }
  }
}

export default App
