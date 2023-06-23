import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Italic extends View {
  @Prop _$content = required

  Body() {
    span()
      .className("italic")
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Italic as any as Typed<Italic>
