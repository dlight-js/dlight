import { View } from "@dlightjs/dlight"

@View
class Expression {
  count = 0

  Body() {
    button("Add").onclick(() => this.count++)
    div()
    {
      _(this.count * 2)
    }
  }
}

export default Expression
