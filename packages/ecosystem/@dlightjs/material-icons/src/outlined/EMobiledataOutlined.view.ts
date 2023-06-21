import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EMobiledataOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 9V7H8v10h8v-2h-6v-2h6v-2h-6V9h6z\"/>")
      .name("EMobiledataOutlined")
  }
}

export default EMobiledataOutlined as any as Typed<DLightIconType>
