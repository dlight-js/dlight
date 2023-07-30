import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag, SubView } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

class HH extends View {
  @Env hh = "shit"
  Body() {
    div(this.hh)
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
      // .setAttributes({
      //   shit: `${this.count}`
      // })
      // .onclick(this.onclick)
    // div("okk")
    //   .height("100px")
    //   .color("red")
    env()
      .hh(this.count)
    {
      env()
        .hh("nono")
      {
        HH()
      }
    }
  }
}

console.log(renderToString(TestView))

export default TestView
