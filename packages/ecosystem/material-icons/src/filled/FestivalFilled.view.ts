import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FestivalFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 5.7V4h3l-1-1.49L16 1h-5v4.7L2 12v10h7v-5l3.03-2L15 17v5h7V12z\"/>")
      .name("FestivalFilled")
  }
}

export default FestivalFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
