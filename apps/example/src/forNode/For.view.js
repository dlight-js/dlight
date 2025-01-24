import { View } from "@dlightjs/dlight"

@View
class For {
  fruitsList = ["apple", "banana", "orange"]

  Body() {
    h2("Fruits:")
    ul()
    {
      for (const fruit of this.fruitsList) {
        li(fruit)
      }
    }
  }
}

export default For
