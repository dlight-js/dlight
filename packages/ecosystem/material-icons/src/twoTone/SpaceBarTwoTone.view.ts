import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default SpaceBarTwoTone as any as Typed<DLightIconType>
