import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CropSquareTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z\"/>")
      .name("CropSquareTwoTone")
  }
}

export default CropSquareTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
