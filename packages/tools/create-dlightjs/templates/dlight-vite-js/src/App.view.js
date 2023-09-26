import { View } from "@dlightjs/dlight"
import { wrap, slogan2, countWrap, countBtn, btnWrap, countText, colorD, colorL, m0 } from "./style.module.css"
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
            .className(colorD)
          span("Light")
            .className(colorL)
        }
        p("Your Modern")
          .className(m0)
        p("Web Framework")
      }
      div()
        .className(countWrap)
      {
        p(this.count)
          .className(`${countBtn} ${countText}`)
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
