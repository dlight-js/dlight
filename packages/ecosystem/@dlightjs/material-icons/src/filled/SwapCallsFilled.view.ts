import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwapCallsFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 4-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-2.21-1.79-4-4-4S5 5.79 5 8v7H2l4 4 4-4H7V8c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V8h3l-4-4z\"/>")
      .name("SwapCallsFilled")
  }
}

export default SwapCallsFilled as any as Typed<DLightIconType>
