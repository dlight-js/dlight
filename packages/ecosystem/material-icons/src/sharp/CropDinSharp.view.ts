import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CropDinSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-2 16H5V5h14v14z\"/>")
      .name("CropDinSharp")
  }
}

export default CropDinSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
