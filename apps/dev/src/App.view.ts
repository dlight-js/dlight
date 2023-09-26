import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div } from "@dlightjs/types"

interface AppProps {
}

@View
class App implements AppProps {
  Body() {
    div("hello dlight")
  }
}

export default App as Pretty as Typed<AppProps>
