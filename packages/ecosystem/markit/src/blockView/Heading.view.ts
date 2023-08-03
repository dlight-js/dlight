import { View } from "@dlightjs/dlight"
import { htmlTag, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "../inlineView"

class Heading extends View {
  @Prop _$content = required
  @Prop props = required
  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
      .className(this.dlightMarkitHeading)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitHeading = css``
}

export default Heading as any as Typed<Heading>
