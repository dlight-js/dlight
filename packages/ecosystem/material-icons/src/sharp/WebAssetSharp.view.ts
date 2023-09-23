import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WebAssetSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 4v16h18V4H3zm16 14H5V8h14v10z\"/>")
      .name("WebAssetSharp")
  }
}

export default WebAssetSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
