import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VillaOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 10c-1.1 0-2 .9-2 2h-1V3L3 8v13h18v-9c0-1.1-.9-2-2-2zM5 9.37l9-3.46V12H9v7H5V9.37zM19 19h-3v-3h-2v3h-3v-5h8v5z\"/>")
      .name("VillaOutlined")
  }
}

export default VillaOutlined as any as Typed<DLightIconType>
