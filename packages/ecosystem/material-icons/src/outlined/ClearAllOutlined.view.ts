import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ClearAllOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z\"/>")
      .name("ClearAllOutlined")
  }
}

export default ClearAllOutlined as any as Typed<DLightIconType>
