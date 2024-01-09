import { View } from "@dlightjs/dlight"
import { wrap, slogan2, countWrap, countBtn, btnWrap, countText, colorD, colorL, m0 } from "./style.module.css"
import Button from "./Button.view"
import Header from "./Header.view"

@View
export default class App {
  count = 0

  View() {
    div()
      .class(wrap)
    {
      Header()
      div()
        .class(slogan2)
      {
        p()
        {
          span("D")
            .class(colorD)
          span("Light")
            .class(colorL)
        }
        p("DX-First UI")
          .class(m0)
        p("Rendering Library")
      }
      div()
        .class(countWrap)
      {
        p(this.count)
          .class(`${countBtn} ${countText}`)
        div()
          .class(btnWrap)
        {
          Button("count ++")
            .onClick(() => {
              this.count++
            })
          Button("count --")
            .onClick(() => {
              this.count--
            })
        }
      }
    }
  }
}
