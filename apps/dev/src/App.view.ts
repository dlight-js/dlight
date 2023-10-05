import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, type SubTyped } from "@dlightjs/types"

import transform from "@dlightjs/transpiler-standalone"

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
const dlightStr = `
@View
class App implements AppProps {
  count = 0
  doubleCount = 0

  Body() {
    div(this.count)
  }
}
`

console.log(transform(dlightStr))

export default App as Pretty as Typed
