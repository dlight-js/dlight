import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpaceBarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 9v4H6V9H4v6h16V9z\"/>")
      .name("SpaceBarFilled")
  }
}

export default SpaceBarFilled as any as Typed<DLightIconType>
