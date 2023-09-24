import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SwitchVideoSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 9.5V5H2v14h16v-4.5l4 4v-13l-4 4zm-5 6V13H7v2.5L3.5 12 7 8.5V11h6V8.5l3.5 3.5-3.5 3.5z\"/>")
      .name("SwitchVideoSharp")
  }
}

export default SwitchVideoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
