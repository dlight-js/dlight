import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UpgradeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 18v2H8v-2h8zM11 7.99V16h2V7.99h3L12 4 8 7.99h3z\"/>")
      .name("UpgradeSharp")
  }
}

export default UpgradeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
