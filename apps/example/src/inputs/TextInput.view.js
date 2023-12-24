import { View } from "@dlightjs/dlight"

@View
class TextInput {
  name = ""

  View() {
    input()
      .placeholder("Enter your name")
      .onInput((e) => {
        this.name = e.target.value
      })
    div(`Hello ${this.name}!`)
  }
}

export default TextInput
