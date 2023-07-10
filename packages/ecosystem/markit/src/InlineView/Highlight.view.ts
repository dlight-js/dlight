import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import css from "@iandx/easy-css"

const highlight = css`
  background-color: yellow;
`
console.log(highlight, "hh")
class Highlight extends View {
  @Prop _$content = required

  Body() {
    span()
      .className(highlight)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Highlight as any as Typed<Highlight>
