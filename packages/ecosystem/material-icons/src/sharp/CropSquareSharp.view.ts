import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CropSquareSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4v16h16V4zm-2 14H6V6h12v12z\"/>")
      .name("CropSquareSharp")
  }
}

export default CropSquareSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
