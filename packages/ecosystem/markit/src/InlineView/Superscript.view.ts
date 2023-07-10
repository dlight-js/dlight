import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, sup, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Superscript extends View {
  @Prop _$content = required

  Body() {
    sup()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Superscript as any as Typed<Superscript>
