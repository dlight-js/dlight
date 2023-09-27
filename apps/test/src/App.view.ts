import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div } from "@dlightjs/types"

@View
class App {
  Body() {
    div("hello dlight")
  }
}

export default App as Pretty as Typed
