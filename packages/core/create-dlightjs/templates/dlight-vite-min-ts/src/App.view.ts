import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div } from "@dlightjs/types"

class App extends View {
  Body() {
    div("hello dlight")
  }
}

export default App as any as Typed<App>
