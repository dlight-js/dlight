import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, sup, type Typed, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface SuperscriptProps {
  ast: ContentProp<any>
}
@View
class Superscript {
  @Prop @Content ast = required

  Body() {
    sup()
      .className(this.dlightMarkitSupscript$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitSupscript$ = css``
}

export default Superscript as Pretty as Typed<SuperscriptProps>
