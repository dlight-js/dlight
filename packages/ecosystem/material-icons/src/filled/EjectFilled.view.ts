import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EjectFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h14v2H5zm7-12L5.33 15h13.34z\"/>")
      .name("EjectFilled")
  }
}

export default EjectFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
