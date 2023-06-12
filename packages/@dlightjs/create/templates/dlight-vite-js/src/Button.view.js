import DLight, { View } from "@dlightjs/dlight"
import { countBtn, btnHover } from "./style.module.css"

export default class Button extends View {
  _$content
  onclick
  btnStatus = 0

  Body() {
    button(this._$content)
      .className(countBtn)
      .className(this.btnStatus === 1 ? btnHover : null)
      .onclick(this.onclick)
      .onmouseover(() => {
        this.btnStatus = 1
      })
      .onmouseleave(() => {
        this.btnStatus = 0
      })
  }
}