import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AspectRatioSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm16-6H1v18h22V3zm-2 16.01H3V4.99h18v14.02z\"/>")
      .name("AspectRatioSharp")
  }
}

export default AspectRatioSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
