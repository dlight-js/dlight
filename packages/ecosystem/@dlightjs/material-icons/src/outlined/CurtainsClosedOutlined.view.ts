import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurtainsClosedOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h20v-2h-2zM13 5v14h-2V5h2zM6 5h3v14H6V5zm9 14V5h3v14h-3z\"/>")
      .name("CurtainsClosedOutlined")
  }
}

export default CurtainsClosedOutlined as any as Typed<DLightIconType>
