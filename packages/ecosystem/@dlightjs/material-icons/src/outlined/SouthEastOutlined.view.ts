import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthEastOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9h-2v6.59L5.41 4 4 5.41 15.59 17H9v2h10V9z\"/>")
      .name("SouthEastOutlined")
  }
}

export default SouthEastOutlined as any as Typed<DLightIconType>
