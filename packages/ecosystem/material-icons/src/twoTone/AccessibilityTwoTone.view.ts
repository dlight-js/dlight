import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AccessibilityTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z\"/>")
      .name("AccessibilityTwoTone")
  }
}

export default AccessibilityTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
