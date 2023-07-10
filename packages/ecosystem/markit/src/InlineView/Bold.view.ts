import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, strong, type Typed } from "@dlightjs/types"
import InlineRenderer from "."

class Bold extends View {
  @Prop _$content = required

  Body() {
    strong()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

export default Bold as any as Typed<Bold>
