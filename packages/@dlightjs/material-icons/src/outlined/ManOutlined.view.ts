import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ManOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 7h-4c-1.1 0-2 .9-2 2v6h2v7h4v-7h2V9c0-1.1-.9-2-2-2z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("ManOutlined")
  }
}

export default ManOutlined as any as Typed<DLightIconType>
