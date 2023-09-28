import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, type SubTyped } from "@dlightjs/types"

@View
class App {
  count = 0
  flag = true

  Body() {
    this.count
    this.count + 1
    this.flag ? "ok" : "no"
    this.count
  }
}

export default App as Pretty as Typed
