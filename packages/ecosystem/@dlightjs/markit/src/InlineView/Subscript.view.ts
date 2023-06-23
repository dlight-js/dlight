import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, sub, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Subscript extends View {
  @Prop _$content = required

  Body() {
    sub()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Subscript as any as Typed<Subscript>
