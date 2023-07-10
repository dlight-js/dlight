import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import css from "@iandx/easy-css"

const strike = css`
  text-decoration: line-through;
`

class Strike extends View {
  @Prop _$content = required

  Body() {
    span()
      .className(strike)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Strike as any as Typed<Strike>
