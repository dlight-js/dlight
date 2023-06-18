import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/>")
      .name("AddSharp")
  }
}

export default AddSharp as any as Typed<DLightIconType>
