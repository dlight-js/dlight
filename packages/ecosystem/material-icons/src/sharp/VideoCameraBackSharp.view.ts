import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideoCameraBackSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10.48V4H2v16h16v-6.48l4 3.98v-11l-4 3.98zM5 16l2.38-3.17L9 15l2.62-3.5L15 16H5z\"/>")
      .name("VideoCameraBackSharp")
  }
}

export default VideoCameraBackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
