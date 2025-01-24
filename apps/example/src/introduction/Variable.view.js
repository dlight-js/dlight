
import { View } from "@dlightjs/dlight"

@View
class Variable {
  name = "John"

  Body() {
    div(`Hello ${this.name}!`)
  }
}

export default Variable
