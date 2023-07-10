import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VillaSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 21H3V8l13-5v7H7v11zm12-11c-1.1 0-2 .9-2 2H9v9h5v-5h2v5h5v-9c0-1.1-.9-2-2-2z\"/>")
      .name("VillaSharp")
  }
}

export default VillaSharp as any as Typed<DLightIconType>
