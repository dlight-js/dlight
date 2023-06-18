import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewComfyOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v16h20V4H2zm2 2h16v5H4V6zm0 12v-5h4v5H4zm6 0v-5h10v5H10z\"/>")
      .name("ViewComfyOutlined")
  }
}

export default ViewComfyOutlined as any as Typed<DLightIconType>
