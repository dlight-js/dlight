import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FeaturedPlayListSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-11 8H3V9h9v2zm0-4H3V5h9v2z\"/>")
      .name("FeaturedPlayListSharp")
  }
}

export default FeaturedPlayListSharp as any as Typed<DLightIconType>
