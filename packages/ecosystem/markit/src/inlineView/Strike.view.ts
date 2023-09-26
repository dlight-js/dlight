import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, span, type Typed, type ContentProp } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface StrikeProps {
  ast: ContentProp<any>
}
@View
class Strike implements StrikeProps {
  @Prop @Content ast = required

  Body() {
    span()
      .className(this.dlightMarkitStrike$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitStrike$ = css`
    text-decoration: line-through;
  `
}

export default Strike as Pretty as Typed<StrikeProps>
