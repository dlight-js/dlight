import { View } from "@dlightjs/dlight"
import { blockquote, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import BlockRenderer from "."

class Blockquote extends View {
  @Prop _$content = required

  Body() {
    blockquote()
      .className(this.dlightMarkitBlockquoteStyle)
    {
      for (const content of this._$content) {
        BlockRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitBlockquoteStyle = css`
    padding: 4px 0 4px 18px;
    border-left: solid 3px gray;
    margin: 4px 0;
  `
}

export default Blockquote as any as Typed<Blockquote>
