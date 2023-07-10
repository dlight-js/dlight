import DLight, { View } from "@dlightjs/dlight"
import { htmlTag, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../InlineView"

class Heading extends View {
  @Prop _$content = required
  @Prop props = required
  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }
}

export default Heading as any as Typed<Heading>
