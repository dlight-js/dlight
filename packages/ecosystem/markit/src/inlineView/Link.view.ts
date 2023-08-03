import { View } from "@dlightjs/dlight"
import { a, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Link extends View {
  @Prop _$content = required
  @Prop props = required
  linkUrl = this.props.linkUrl

  Body() {
    a()
      .href(this.linkUrl)
      .className("font-medium text-blue-600 dark:text-blue-500 hover:underline")
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Link as any as Typed<Link>
