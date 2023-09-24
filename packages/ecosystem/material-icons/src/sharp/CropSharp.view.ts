import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CropSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 15h2V5H9v2h8v8zM7 17V1H5v4H1v2h4v12h12v4h2v-4h4v-2H7z\"/>")
      .name("CropSharp")
  }
}

export default CropSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
