import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StartOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.59 7.41 18.17 11H6v2h12.17l-3.59 3.59L16 18l6-6-6-6-1.41 1.41zM2 6v12h2V6H2z\"/>")
      .name("StartOutlined")
  }
}

export default StartOutlined as any as Typed<DLightIconType>
