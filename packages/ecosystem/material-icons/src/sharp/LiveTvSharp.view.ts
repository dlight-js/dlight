import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LiveTvSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 6h-9.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H1v16h22V6zm-2 14H3V8h18v12zM9 10v8l7-4-7-4z\"/>")
      .name("LiveTvSharp")
  }
}

export default LiveTvSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
