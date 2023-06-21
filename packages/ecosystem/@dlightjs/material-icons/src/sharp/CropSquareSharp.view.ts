import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CropSquareSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4v16h16V4zm-2 14H6V6h12v12z\"/>")
      .name("CropSquareSharp")
  }
}

export default CropSquareSharp as any as Typed<DLightIconType>
