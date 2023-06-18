import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EjectSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h14v2H5v-2zm7-12L5.33 15h13.34L12 5z\"/>")
      .name("EjectSharp")
  }
}

export default EjectSharp as any as Typed<DLightIconType>
