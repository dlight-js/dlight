import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineSeatIndividualSuiteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 13c1.65 0 3-1.35 3-3S8.65 7 7 7s-3 1.35-3 3 1.35 3 3 3zm16-6H11v7H3V7H1v10h22V7z\"/>")
      .name("AirlineSeatIndividualSuiteSharp")
  }
}

export default AirlineSeatIndividualSuiteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
