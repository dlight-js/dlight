
import { View } from "@dlightjs/dlight"

@View
class Variable {
  name = "John"

  View() {
    div(`Hello ${this.name}!`)
  }
}

export default Variable
