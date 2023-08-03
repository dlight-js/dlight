import { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@dlightjs/easy-css"

class Strike extends View {
  @Prop _$content = required

  Body() {
    span()
      .className(this.dlightMarkitStrike)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitStrike = css`
    text-decoration: line-through;
  `
}

export default Strike as any as Typed<Strike>
