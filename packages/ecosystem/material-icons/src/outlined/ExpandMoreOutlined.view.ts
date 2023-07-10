import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ExpandMoreOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z\"/>")
      .name("ExpandMoreOutlined")
  }
}

export default ExpandMoreOutlined as any as Typed<DLightIconType>
