import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, sup, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import InlineRenderer from "."

interface SuperscriptProps {
  _$content: any
}
class Superscript extends View {
  @Prop _$content = required

  Body() {
    sup()
      .className(this.dlightMarkitSupscript$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSupscript$ = css``
}

export default Superscript as Pretty as Typed<SuperscriptProps>
