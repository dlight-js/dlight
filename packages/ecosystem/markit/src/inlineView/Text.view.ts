import { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class Text extends View {
  @Prop _$content = required
  Body() {
    span(this._$content)
      .className(this.dlightMarkitText)
  }

  dlightMarkitText = css``
}

export default Text as any as Typed<Text>
