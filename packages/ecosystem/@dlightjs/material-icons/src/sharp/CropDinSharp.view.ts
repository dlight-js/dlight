import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CropDinSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-2 16H5V5h14v14z\"/>")
      .name("CropDinSharp")
  }
}

export default CropDinSharp as any as Typed<DLightIconType>
