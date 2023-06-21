import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RollerSkatingSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20 16-.01-6-5.71-1.43A3 3 0 0 1 12.32 7H9V6h3.02L12 5H9V4h3V1H4v15h16zM5 23c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm14 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-7 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z\"/>")
      .name("RollerSkatingSharp")
  }
}

export default RollerSkatingSharp as any as Typed<DLightIconType>
