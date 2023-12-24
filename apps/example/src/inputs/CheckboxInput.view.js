import { View } from "@dlightjs/dlight"

@View
class CheckboxInput {
  choices = []

  View() {
    div("Choose your favorite fruits:")
    for (const fruit of ["apple", "banana", "strawberry"]) {
      div()
      {
        input()
          .name("favoriteFruit")
          .id(fruit)
          .type("checkbox")
          .value(fruit)
          .onChange(e => {
            if (this.choices.includes(e.target.value)) {
              this.choices = this.choices.filter(
                choice => choice !== e.target.value
              )
            } else {
              this.choices.push(e.target.value)
              this.choices = [...this.choices]
            }
          })
        label(fruit).for(fruit)
      }
    }

    div(`Your favorite fruit is ${this.choices.join(",")}!`)
  }
}

export default CheckboxInput
