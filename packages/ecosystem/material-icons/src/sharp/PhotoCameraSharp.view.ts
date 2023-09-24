import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhotoCameraSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M9 2 7.17 4H2v16h20V4h-5.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z\"/>")
      .name("PhotoCameraSharp")
  }
}

export default PhotoCameraSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
