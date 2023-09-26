import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, span, type Typed, type ContentProp } from "@dlightjs/types"
import InlineRenderer from "."
import { css } from "@iandx/easy-css"

interface UnderlineProps {
  ast: ContentProp<any>
}
@View
class Underline implements UnderlineProps {
  @Prop @Content ast = required

  Body() {
    span()
      .className(this.dlightMarkitUnderline$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitUnderline$ = css`
    text-decoration: underline;
  `
}
export default Underline as Pretty as Typed<UnderlineProps>
