import { View } from "@dlightjs/dlight"
import { Prop, required, strong, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import InlineRenderer from "."

class Bold extends View {
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

export default Bold as any as Typed<Bold>
