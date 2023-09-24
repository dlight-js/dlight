import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AirlinesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 4 2 20h17l3-16h-9zm1.5 10a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z\"/>")
      .name("AirlinesSharp")
  }
}

export default AirlinesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
