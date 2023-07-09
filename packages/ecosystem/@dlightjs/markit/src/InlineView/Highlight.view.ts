import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

class Highlight extends View {
  @Prop _$content = required

  Body() {
    span()
      .className(this.dlightMarkitHighlight)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitHighlight = css`
    background-color: yellow;
  `
}

export default Highlight as any as Typed<Highlight>
