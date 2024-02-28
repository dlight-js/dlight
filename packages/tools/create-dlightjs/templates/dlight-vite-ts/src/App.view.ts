import { View, type Typed, div, p, button, span, type Pretty, type SnippetTyped, Snippet  } from "@dlightjs/dlight"
import Header from "./Header.view"
import { wrap, slogan2, countWrap, countBtn, btnHover, btnWrap, countText, colorD, colorL, m0 } from "./style.module.css"

interface BtnProps {
  content: string
  onClick: () => void
  index: number
}

@View
class App {
  count = 0
  btnStatus = [0, 0]

  @Snippet
  Btn = (({ content, onClick, index }: BtnProps) => {
    button(content)
      .class(this.btnStatus[index] === 1 ? `${countBtn} ${btnHover}` : countBtn)
      .onClick(onClick)
      .onMouseOver(() => {
        this.btnStatus[index] = 1
        this.btnStatus = [...this.btnStatus]
      })
      .onMouseLeave(() => {
        this.btnStatus[index] = 0
        this.btnStatus = [...this.btnStatus]
      })
  }) as Pretty as SnippetTyped<BtnProps>


  Body() {
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
        p("DX-first UI")
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
          this.Btn("count ++")
            .index(0)
            .onClick(() => {
              this.count++
            })
          this.Btn("count --")
            .index(1)
            .onClick(() => {
              this.count--
            })
        }
      }
    }
  }
}

export default App as Pretty as Typed
