// ~> ColorSelect.view.js
import DLight, { View } from "@dlightjs/dlight"

const colors = [
  { id: 1, text: "red" },
  { id: 2, text: "blue" },
  { id: 3, text: "green" },
  { id: 4, text: "gray", isDisabled: true }
]

class ColorSelect extends View {
  selectedColorId = 2

  Body() {
    select()
      .value(this.selectedColorId)
      .onchange(e => { this.selectedColorId = e.target.value })
    {
      for (const { id, text, isDisabled } of colors) {
        option(text)
          .value(id)
          .disabled(isDisabled)
      }
    }
  }
}
