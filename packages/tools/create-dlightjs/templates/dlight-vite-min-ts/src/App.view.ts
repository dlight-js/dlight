import { View, type Typed, type Pretty, div } from "@dlightjs/dlight"

interface AppProps {
}

@View
class App implements AppProps {
  View() {
    div("hello dlight")
  }
}

export default App as Pretty as Typed<AppProps>
