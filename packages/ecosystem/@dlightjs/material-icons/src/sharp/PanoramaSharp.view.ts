import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PanoramaSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 20V4H1v16h22zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z\"/>")
      .name("PanoramaSharp")
  }
}

export default PanoramaSharp as any as Typed<DLightIconType>
