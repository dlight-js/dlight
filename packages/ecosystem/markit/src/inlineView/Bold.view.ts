import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, strong, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface BoldProps {
  _$content: any
}
class Bold extends View implements BoldProps {
  @Prop _$content = required

  Body() {
    strong()
      .className(this.dlightMarkitBold$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitBold$ = css``
}

export default Bold as Pretty as Typed<BoldProps>
