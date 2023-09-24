import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HorizontalDistributeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 22H2V2h2v20zM22 2h-2v20h2V2zm-8.5 5h-3v10h3V7z\"/>")
      .name("HorizontalDistributeSharp")
  }
}

export default HorizontalDistributeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
