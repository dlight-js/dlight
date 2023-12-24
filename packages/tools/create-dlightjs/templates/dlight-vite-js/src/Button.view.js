import { View } from "@dlightjs/dlight"
import { countBtn, btnHover } from "./style.module.css"

@View
export default class Button {
  @Content content
  @Prop onClick
  btnStatus = 0

  View() {
    button(this.content)
      .class(this.btnStatus === 1 ? `${countBtn} ${btnHover}` : countBtn)
      .onClick(this.onClick)
      .onMouseOver(() => {
        this.btnStatus = 1
      })
      .onMouseLeave(() => {
        this.btnStatus = 0
      })
  }
}