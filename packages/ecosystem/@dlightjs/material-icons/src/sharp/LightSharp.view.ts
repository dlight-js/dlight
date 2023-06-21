import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LightSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 6.06V3h-2v3.06A9.006 9.006 0 0 0 3.22 17H8c0 2.21 1.79 4 4 4s4-1.79 4-4h4.78A9.006 9.006 0 0 0 13 6.06zM12 15H5c0-3.86 3.14-7 7-7s7 3.14 7 7h-7z\"/>")
      .name("LightSharp")
  }
}

export default LightSharp as any as Typed<DLightIconType>
