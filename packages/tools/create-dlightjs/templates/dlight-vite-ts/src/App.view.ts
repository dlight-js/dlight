import { View } from "@dlightjs/dlight"
import { type Typed, div, p, button, span, type Pretty } from "@dlightjs/types"
import Header from "./Header.view"
import { wrap, slogan2, countWrap, countBtn, btnHover, btnWrap, countText, colorD, colorL, m0 } from "./style.module.css"

interface BtnProps {
  content: string
  onclick: () => void
  index: number
}
@View
class App {
  count = 0
  btnStatus = [0, 0]

  @View
  Btn = (({ content, onclick, index }: BtnProps) => {
    button(content)
      .className(this.btnStatus[index] === 1 ? `${countBtn} ${btnHover}` : countBtn)
      .onclick(onclick)
      .onmouseover(() => {
        this.btnStatus[index] = 1
        this.btnStatus = [...this.btnStatus]
      })
      .onmouseleave(() => {
        this.btnStatus[index] = 0
        this.btnStatus = [...this.btnStatus]
      })
  }) as any as Typed<BtnProps>


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
          this.Btn("count ++")
            .index(0)
            .onclick(() => {
              this.count++
            })
          this.Btn("count --")
            .index(1)
            .onclick(() => {
              this.count--
            })
        }
      }
    }
  }
}

export default App as Pretty as Typed
