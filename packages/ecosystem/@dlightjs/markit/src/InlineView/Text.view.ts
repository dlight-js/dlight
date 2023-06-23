import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"

class Text extends View {
  @Prop _$content = required
  Body() {
    span(this._$content)
  }
}

export default Text as any as Typed<Text>
