import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag, SubView } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

class JJ extends View {
  Body() {
    div("tt")
  }
}

class TestView extends View {
  count = 5

  onclick() {
    this.count--
    console.log(this.count)
  }

  @SubView
  JJ() {
    div("jhh")
      .color("blue")
  }

  Body() {
    button("+")
      .addEvents({
        click: this.onclick
      })
      .setAttributes({
        shit: `${this.count}`
      })
      // .onclick(this.onclick)
    div("okk")
      .height("100px")
      .color("red")
    this.JJ()
  }
}

console.log(renderToString(TestView))

export default TestView
