import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, sub, type Typed, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface SubscriptProps {
  ast: ContentProp<any>
}
@View
class Subscript implements SubscriptProps {
  @Prop @Content ast = required

  Body() {
    sub()
      .className(this.dlightMarkitSubscript$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSubscript$ = css``
}

export default Subscript as Pretty as Typed<SubscriptProps>
