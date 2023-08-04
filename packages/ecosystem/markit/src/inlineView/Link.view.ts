import { View } from "@dlightjs/dlight"
import { a, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@dlightjs/easy-css"

class Link extends View {
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

export default Link as any as Typed<Link>
