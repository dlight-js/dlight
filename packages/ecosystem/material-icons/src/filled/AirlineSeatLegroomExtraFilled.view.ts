import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineSeatLegroomExtraFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 12V3H2v9c0 2.76 2.24 5 5 5h6v-2H7c-1.66 0-3-1.34-3-3zm18.83 5.24c-.38-.72-1.29-.97-2.03-.63l-1.09.5-3.41-6.98a2.01 2.01 0 0 0-1.79-1.12L11 9V3H5v8c0 1.66 1.34 3 3 3h7l3.41 7 3.72-1.7c.77-.36 1.1-1.3.7-2.06z\"/>")
      .name("AirlineSeatLegroomExtraFilled")
  }
}

export default AirlineSeatLegroomExtraFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
