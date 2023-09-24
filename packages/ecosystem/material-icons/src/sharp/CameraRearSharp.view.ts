import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CameraRearSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zm5-20H5v18h14V0zm-7 6c-1.11 0-2-.9-2-2s.89-2 1.99-2 2 .9 2 2C14 5.1 13.1 6 12 6z\"/>")
      .name("CameraRearSharp")
  }
}

export default CameraRearSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
