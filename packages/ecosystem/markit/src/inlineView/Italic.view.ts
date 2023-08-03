import { View } from "@dlightjs/dlight"
import { Prop, required, em, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import InlineRenderer from "."

class Italic extends View {
  @Prop _$content = required

  Body() {
    em()
      .className(this.dlightMarkitItalic)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitItalic = css``
}

export default Italic as any as Typed<Italic>
