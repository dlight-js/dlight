import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CarpenterSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 1.5 3.11 5.39l8.13 11.67-1.41 1.41 4.24 4.24 7.07-7.07L7 1.5zm5.66 16.97 4.24-4.24 1.41 1.41-4.24 4.24-1.41-1.41z\"/>")
      .name("CarpenterSharp")
  }
}

export default CarpenterSharp as any as Typed<DLightIconType>
