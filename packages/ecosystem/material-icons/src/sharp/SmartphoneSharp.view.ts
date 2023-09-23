import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SmartphoneSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 1v22h14V1H5zm12 18H7V5h10v14z\"/>")
      .name("SmartphoneSharp")
  }
}

export default SmartphoneSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
