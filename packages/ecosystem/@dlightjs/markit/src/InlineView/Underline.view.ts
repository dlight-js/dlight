import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import css from "@iandx/easy-css"

const underline = css`
  text-decoration: underline;
`

class Underline extends View {
  @Prop _$content = required

  Body() {
    span()
      .className(underline)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}
export default Underline as any as Typed<Underline>
