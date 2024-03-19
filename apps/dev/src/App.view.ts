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
@Model
class JJ {
  jj = 1
  ui() {
    this.jj = 2
  }
}
@View
class DataView {
  @Prop count
  @Watch
  watcher() {
    console.log(this.count, this.count.notExist) // Error occurs here
  }
  Body() {}
}
@Main
@View
class MyComp {
  w 
  count = null
  jj() {
    this.w = 1
  }

  Body() {
    try {
      DataView().count(this.count)
      button().onClick(() => {
        this.count = null
      })
    } catch (e) {
      div(e.message)
    }
  }
}

// @View
// @Main
// class App {
//   Body() {
//     JJ()
//     {
//       Fuck()
//     }
//   }
// }

// export default App
