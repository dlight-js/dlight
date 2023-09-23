import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FiberPinSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.5 10.5h2v1h-2v-1zM22 4H2v16h20V4zM9 13H5.5v2H4V9h5v4zm3.5 2H11V9h1.5v6zm7.5 0h-1.2l-2.55-3.5V15H15V9h1.25l2.5 3.5V9H20v6z\"/>")
      .name("FiberPinSharp")
  }
}

export default FiberPinSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
