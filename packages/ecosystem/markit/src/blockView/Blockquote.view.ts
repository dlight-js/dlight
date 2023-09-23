import { View } from "@dlightjs/dlight"
import { blockquote, type Pretty, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import BlockRenderer from "."

interface BlockquoteProps {
  _$content: any
}

class Blockquote extends View implements BlockquoteProps {
  @Prop _$content = required

  Body() {
    blockquote()
      .className(this.dlightMarkitBlockquoteStyle$)
    {
      for (const content of this._$content) {
        BlockRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitBlockquoteStyle$ = css`
    padding: 4px 0 4px 18px;
    border-left: solid 3px gray;
    margin: 4px 0;
  `
}

export default Blockquote as Pretty as Typed<BlockquoteProps>
