import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, sub, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import InlineRenderer from "."

interface SubscriptProps {
  _$content: any
}
class Subscript extends View implements SubscriptProps {
  @Prop _$content = required

  Body() {
    sub()
      .className(this.dlightMarkitSubscript$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSubscript$ = css``
}

export default Subscript as Pretty as Typed<SubscriptProps>
