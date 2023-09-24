import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, span, type Typed, type ContentProp } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface HighlightProps {
  ast: ContentProp<any>
}

@View
class Highlight implements HighlightProps {
  @Prop @Content ast = required

  Body() {
    span()
      .className(this.dlightMarkitHighlight$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitHighlight$ = css`
    background-color: yellow;
  `
}

export default Highlight as Pretty as Typed<HighlightProps>
