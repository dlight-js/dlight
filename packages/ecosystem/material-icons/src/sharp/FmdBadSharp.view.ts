import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FmdBadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm1 13h-2v-2h2v2zm0-4h-2V6h2v5z\"/>")
      .name("FmdBadSharp")
  }
}

export default FmdBadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
