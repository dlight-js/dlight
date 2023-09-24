import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, div, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "../inlineView"

interface ParagraphProps {
  ast: ContentProp<any>
}
@View
class Paragraph implements ParagraphProps {
  @Prop @Content ast = required

  Body() {
    div()
      .className(this.dlightMarkitParagraph$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitParagraph$ = css``
}

export default Paragraph as Pretty as Typed<ParagraphProps>
