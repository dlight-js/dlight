import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DataArraySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 4v2h3v12h-3v2h5V4zM4 20h5v-2H6V6h3V4H4z\"/>")
      .name("DataArraySharp")
  }
}

export default DataArraySharp as any as Typed<DLightIconType>
