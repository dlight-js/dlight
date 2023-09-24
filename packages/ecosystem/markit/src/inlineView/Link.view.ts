import { Prop, required, View, Content } from "@dlightjs/dlight"
import { a, type ContentProp, type Pretty, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface LinkProps {
  ast: ContentProp<any>
  props: any
}

@View
class Link implements LinkProps {
  @Prop @Content ast = required

  @Prop props = required
  linkUrl = this.props.linkUrl

  Body() {
    a()
      .href(this.linkUrl)
      .className(this.dlightMarkitLink$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitLink$ = css``
}

export default Link as Pretty as Typed<LinkProps>
