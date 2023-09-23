import { View } from "@dlightjs/dlight"
import { a, type Pretty, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface LinkProps {
  _$content: any
  props: any
}

class Link extends View implements LinkProps {
  @Prop _$content = required
  @Prop props = required
  linkUrl = this.props.linkUrl

  Body() {
    a()
      .href(this.linkUrl)
      .className(this.dlightMarkitLink$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitLink$ = css``
}

export default Link as Pretty as Typed<LinkProps>
