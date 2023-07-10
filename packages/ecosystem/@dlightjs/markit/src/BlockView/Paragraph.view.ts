import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../InlineView"

class Paragraph extends View {
  @Prop _$content = required

  Body() {
    div()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }
}

export default Paragraph as any as Typed<Paragraph>
