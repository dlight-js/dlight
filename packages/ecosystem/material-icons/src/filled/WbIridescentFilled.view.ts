import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WbIridescentFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49 1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z\"/>")
      .name("WbIridescentFilled")
  }
}

export default WbIridescentFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
