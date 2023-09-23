import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpaceBarTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 13H6V9H4v6h16V9h-2z\"/>")
      .name("SpaceBarTwoTone")
  }
}

export default SpaceBarTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
