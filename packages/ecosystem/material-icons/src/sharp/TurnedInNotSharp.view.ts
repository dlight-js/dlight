import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnedInNotSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5.01L5 21l7-3 7 3V3zm-2 15-5-2.18L7 18V5h10v13z\"/>")
      .name("TurnedInNotSharp")
  }
}

export default TurnedInNotSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
