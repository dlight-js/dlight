import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

interface TextProps {
  _$content: any
}
class Text extends View implements TextProps {
  @Prop _$content = required
  Body() {
    span(this._$content)
      .className(this.dlightMarkitText$)
  }

  dlightMarkitText$ = css``
}

export default Text as Pretty as Typed<TextProps>
