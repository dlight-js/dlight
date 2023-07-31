import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag, SubView } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"

class NNN extends View {
  Body() {
    _(this._$children)
  }
}

class JJ extends View {
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
      .hh("nono")
    {
      env()
        .hh("jj")
      {
        env()
          .hh("lit")
        {
          JJ()
          NNN()
          {
            JJ()
          }
        }
      }
    }
  }
}

console.log(renderToString(TestView))

export default TestView
