import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, strong, type Typed, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface BoldProps {
  ast: ContentProp<any>
}
@View
class Bold implements BoldProps {
  @Prop @Content ast = required

  Body() {
    strong()
      .className(this.dlightMarkitBold$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitBold$ = css``
}

export default Bold as Pretty as Typed<BoldProps>
