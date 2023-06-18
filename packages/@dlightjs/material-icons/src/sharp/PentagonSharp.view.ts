import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PentagonSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m2 9 4 12h12l4-12-10-7z\"/>")
      .name("PentagonSharp")
  }
}

export default PentagonSharp as any as Typed<DLightIconType>
