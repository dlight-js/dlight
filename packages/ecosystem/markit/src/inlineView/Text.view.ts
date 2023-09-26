import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, span, type Typed, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface TextProps {
  ast: ContentProp<any>
}
@View
class Text implements TextProps {
  @Prop @Content ast = required

  Body() {
    span(this.ast)
      .className(this.dlightMarkitText$)
  }

  dlightMarkitText$ = css``
}

export default Text as Pretty as Typed<TextProps>
