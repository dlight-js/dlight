import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "../inlineView"

class Paragraph extends View {
  @Prop _$content = required

  Body() {
    div()
      .className(this.dlightMarkitParagraph)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitParagraph = css``
}

export default Paragraph as any as Typed<Paragraph>
