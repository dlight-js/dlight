import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ThumbDownOffAltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3h4v12h-4zM1 11.6V16h8.31l-1.12 5.38L9.83 23 17 15.82V3H4.69L1 11.6zM15 5v9.99l-4.34 4.35.61-2.93.5-2.41H3v-1.99L6.01 5H15z\"/>")
      .name("ThumbDownOffAltSharp")
  }
}

export default ThumbDownOffAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
