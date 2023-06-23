import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"

class Code extends View {
  @Prop _$content = required

  Body() {
    span(this._$content)
      .className("rounded p-1 bg-gray-200 text-orange-600")
      .style({ fontSize: "95%" })
  }
}

export default Code as any as Typed<Code>
