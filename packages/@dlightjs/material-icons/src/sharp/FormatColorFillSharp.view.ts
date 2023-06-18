import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatColorFillSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 17.62 17.62 10l-10-10-1.41 1.41 2.38 2.38L2.38 10 10 17.62zm0-12.41L14.79 10H5.21L10 5.21zM19 17c1.1 0 2-.9 2-2 0-1.33-2-3.5-2-3.5s-2 2.17-2 3.5c0 1.1.9 2 2 2zM2 20h20v4H2z\"/>")
      .name("FormatColorFillSharp")
  }
}

export default FormatColorFillSharp as any as Typed<DLightIconType>
