import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhotoCameraFrontSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.83 5 15 3H9L7.17 5H2v16h20V5h-5.17zM12 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8H8v-.57c0-.81.48-1.53 1.22-1.85a6.95 6.95 0 0 1 5.56 0A2.01 2.01 0 0 1 16 16.43V17z\"/>")
      .name("PhotoCameraFrontSharp")
  }
}

export default PhotoCameraFrontSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
