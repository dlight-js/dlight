import DLight, { View } from "@dlightjs/dlight"
import { wrap, slogan2, countWrap, countBtn, btnWrap, countText } from "./style.module.css"
import Button from "./Button.view"
import Header from "./Header.view"

export default class App extends View {
  count = 0

  Body() {
    div()
      .className(wrap)
    {
      Header()
      div()
        .className(slogan2)
      {
        p()
        {
          span("D")
            ._color("rgb(194, 225, 154)")
          span("Light")
            ._color("rgb(241,192,149)")
        }
        p("Your Modern")
          ._margin("0px")
        p("Web Framework")
      }
      div()
        .className(countWrap)
      {
        p(this.count)
          .className(countBtn)
          .className(countText)
        div()
          .className(btnWrap)
        {
          Button("count ++")
            .onclick(() => {
              this.count++
            })
          Button("count --")
            .onclick(() => {
              this.count--
            })
        }
      }
    }
  }
}
