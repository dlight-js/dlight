import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Highlight extends View {
  @Prop _$content = required

  Body() {
    span()
      .className("bg-yellow-200")
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Highlight as any as Typed<Highlight>
