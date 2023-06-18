import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SlideshowSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 8v8l5-4-5-4zm11-5H3v18h18V3zm-2 16H5V5h14v14z\"/>")
      .name("SlideshowSharp")
  }
}

export default SlideshowSharp as any as Typed<DLightIconType>
