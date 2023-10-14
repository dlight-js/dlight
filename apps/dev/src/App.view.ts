import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div } from "@dlightjs/types"

@View
class Comp {
  message = "Hello"

  Body() {
    div()
    {
      div(this.message)
    }
  }
}
const CompView = Comp as Pretty as Typed

@View
class Comp2 {
  message = "Hello"

  Body() {
    CompView()
  }
}
const CompView2 = Comp2 as Pretty as Typed

@View
class Comp3 {
  message = "Hello"

  Body() {
    CompView2()
  }
}
const CompView3 = Comp3 as Pretty as Typed

@View
class App {
  count = 1

  Body() {
    div(this.count)
    CompView()
    CompView3()
  }
}

export default App as Pretty as Typed
