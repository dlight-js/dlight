import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ExposureNeg1TwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 18V5h-.3L14 6.7v1.7l3-1.02V18zM4 11h8v2H4z\"/>")
      .name("ExposureNeg1TwoTone")
  }
}

export default ExposureNeg1TwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
