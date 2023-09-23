import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineSeatIndividualSuiteRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 13c1.65 0 3-1.35 3-3S8.65 7 7 7s-3 1.35-3 3 1.35 3 3 3zm12-6h-6c-1.1 0-2 .9-2 2v5H3V8c0-.55-.45-1-1-1s-1 .45-1 1v7c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-4c0-2.21-1.79-4-4-4z\"/>")
      .name("AirlineSeatIndividualSuiteRound")
  }
}

export default AirlineSeatIndividualSuiteRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
