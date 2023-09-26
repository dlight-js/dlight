import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AirplaySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 22h12l-6-6-6 6zM23 3H1v16h6v-2H3V5h18v12h-4v2h6V3z\"/>")
      .name("AirplaySharp")
  }
}

export default AirplaySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
