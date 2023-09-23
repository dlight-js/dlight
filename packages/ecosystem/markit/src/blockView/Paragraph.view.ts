import { View } from "@dlightjs/dlight"
import { div, type Pretty, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "../inlineView"

interface ParagraphProps {
  _$content: any
}
class Paragraph extends View implements ParagraphProps {
  @Prop _$content = required

  Body() {
    div()
      .className(this.dlightMarkitParagraph$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitParagraph$ = css``
}

export default Paragraph as Pretty as Typed<ParagraphProps>
