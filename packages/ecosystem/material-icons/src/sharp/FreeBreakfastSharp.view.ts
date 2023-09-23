import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FreeBreakfastSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 3H4v14h14v-7h2a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z\"/>")
      .name("FreeBreakfastSharp")
  }
}

export default FreeBreakfastSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
