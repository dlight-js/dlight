import { View } from "@dlightjs/dlight"
import { countBtn, btnHover } from "./style.module.css"

@View
export default class Button {
  @Content content
  onclick
  btnStatus = 0

  Body() {
    button(this.content)
      .className(this.btnStatus[index] === 1 ? `${countBtn} ${btnHover}` : countBtn)
      .onclick(this.onclick)
      .onmouseover(() => {
        this.btnStatus = 1
      })
      .onmouseleave(() => {
        this.btnStatus = 0
      })
  }
}