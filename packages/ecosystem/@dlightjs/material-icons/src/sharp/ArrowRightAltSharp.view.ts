import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowRightAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z\"/>")
      .name("ArrowRightAltSharp")
  }
}

export default ArrowRightAltSharp as any as Typed<DLightIconType>
