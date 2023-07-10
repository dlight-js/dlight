import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, sup, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

class Superscript extends View {
  @Prop _$content = required

  Body() {
    sup()
      .className(this.dlightMarkitSupscript)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSupscript = css``
}

export default Superscript as any as Typed<Superscript>
