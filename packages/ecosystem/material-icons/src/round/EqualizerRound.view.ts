import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EqualizerRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2zm-6 0c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2zm10-9v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2z\"/>")
      .name("EqualizerRound")
  }
}

export default EqualizerRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
