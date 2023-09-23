import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpaceBarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 9v4H6V9H4v6h16V9h-2z\"/>")
      .name("SpaceBarSharp")
  }
}

export default SpaceBarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
