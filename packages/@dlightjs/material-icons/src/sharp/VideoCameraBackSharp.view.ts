import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideoCameraBackSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10.48V4H2v16h16v-6.48l4 3.98v-11l-4 3.98zM5 16l2.38-3.17L9 15l2.62-3.5L15 16H5z\"/>")
      .name("VideoCameraBackSharp")
  }
}

export default VideoCameraBackSharp as any as Typed<DLightIconType>
