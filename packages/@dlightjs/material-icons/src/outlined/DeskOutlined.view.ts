import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DeskOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 6v12h2V8h10v10h2v-2h4v2h2V6H2zm18 2v2h-4V8h4zm-4 6v-2h4v2h-4z\"/>")
      .name("DeskOutlined")
  }
}

export default DeskOutlined as any as Typed<DLightIconType>
