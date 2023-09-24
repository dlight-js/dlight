import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, htmlTag, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "../inlineView"

interface HeadingProps {
  ast: ContentProp<any>
  props: any
}
@View
class Heading implements HeadingProps {
  @Prop @Content ast = required

  @Prop props = required
  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
      .className(this.dlightMarkitHeading$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }

  dlightMarkitHeading$ = css``
}

export default Heading as Pretty as Typed<HeadingProps>
