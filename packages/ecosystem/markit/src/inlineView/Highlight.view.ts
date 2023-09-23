import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@dlightjs/easy-css"

interface HighlightProps {
  _$content: any
}

class Highlight extends View implements HighlightProps {
  @Prop _$content = required

  Body() {
    span()
      .className(this.dlightMarkitHighlight$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitHighlight$ = css`
    background-color: yellow;
  `
}

export default Highlight as Pretty as Typed<HighlightProps>
