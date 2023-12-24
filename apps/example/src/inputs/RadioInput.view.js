import { View } from "@dlightjs/dlight"

@View
class RadioInput {
  choice = ""

  View() {
    div("Choose your favorite fruit:")
    for (const fruit of ["apple", "banana", "strawberry"]) {
      div()
      {
        input()
          .name("favoriteFruit")
          .id(fruit)
          .type("radio")
          .value(fruit)
          .onInput(e => {
            this.choice = e.target.value
          })
        label(fruit).for(fruit)
      }
    }

    div(`Your favorite fruit is ${this.choice}!`)
  }
}

export default RadioInput
