import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CropLandscapeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5H3v14h18V5zm-2 12H5V7h14v10z\"/>")
      .name("CropLandscapeSharp")
  }
}

export default CropLandscapeSharp as any as Typed<DLightIconType>
