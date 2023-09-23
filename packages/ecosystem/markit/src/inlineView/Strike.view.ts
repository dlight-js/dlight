import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface StrikeProps {
  _$content: any
}
class Strike extends View implements StrikeProps {
  @Prop _$content = required

  Body() {
    span()
      .className(this.dlightMarkitStrike$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitStrike$ = css`
    text-decoration: line-through;
  `
}

export default Strike as Pretty as Typed<StrikeProps>
