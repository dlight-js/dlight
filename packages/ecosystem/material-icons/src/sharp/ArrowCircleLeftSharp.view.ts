import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowCircleLeftSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 12zm10-1h4v2h-4v3l-4-4 4-4v3z\"/>")
      .name("ArrowCircleLeftSharp")
  }
}

export default ArrowCircleLeftSharp as any as Typed<DLightIconType>
