import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, sub, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

class Subscript extends View {
  @Prop _$content = required

  Body() {
    sub()
      .className(this.dlightMarkitSubscript)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSubscript = css``
}

export default Subscript as any as Typed<Subscript>
