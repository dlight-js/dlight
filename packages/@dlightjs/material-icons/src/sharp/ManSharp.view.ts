import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ManSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7H8v8h2v7h4v-7h2z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("ManSharp")
  }
}

export default ManSharp as any as Typed<DLightIconType>
