import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhotoCameraBackSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.83 5 15 3H9L7.17 5H2v16h20V5h-5.17zM6 17l3-4 2.25 3 3-4L18 17H6z\"/>")
      .name("PhotoCameraBackSharp")
  }
}

export default PhotoCameraBackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
