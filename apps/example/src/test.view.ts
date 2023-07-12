import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

class TestView extends View {
  onclick() {
    this.count--
    console.log(this.count)
  }

  count = 5

  Body() {
    button("+") 
      .onclick(this.onclick)
    _(do {
      htmlTag(`h${this.count}`)("hhh")
    })
  }
}

console.log(renderToString(TestView))

export default TestView
