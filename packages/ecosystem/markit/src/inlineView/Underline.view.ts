import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@dlightjs/easy-css"

interface UnderlineProps {
  _$content: any
}
class Underline extends View implements UnderlineProps {
  @Prop _$content = required

  Body() {
    span()
      .className(this.dlightMarkitUnderline$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitUnderline$ = css`
    text-decoration: underline;
  `
}
export default Underline as Pretty as Typed<UnderlineProps>
