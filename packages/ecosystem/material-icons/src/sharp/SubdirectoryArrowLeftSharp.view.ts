import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SubdirectoryArrowLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m11 9 1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z\"/>")
      .name("SubdirectoryArrowLeftSharp")
  }
}

export default SubdirectoryArrowLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
