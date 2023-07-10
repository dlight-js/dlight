import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 10V5H3v5H2v9h2v-2h16v2h2v-9h-1zm-8-3h6v3h-6V7zm-8 3V7h6v3H5zm-1 5v-3h16v3H4z\"/>")
      .name("BedSharp")
  }
}

export default BedSharp as any as Typed<DLightIconType>
