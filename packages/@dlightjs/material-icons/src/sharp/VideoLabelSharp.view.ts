import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideoLabelSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-2 13H3V5h18v11z\"/>")
      .name("VideoLabelSharp")
  }
}

export default VideoLabelSharp as any as Typed<DLightIconType>
