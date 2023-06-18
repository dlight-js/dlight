import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class GradingOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 7h16v2H4V7zm0 6h16v-2H4v2zm0 4h7v-2H4v2zm0 4h7v-2H4v2zm11.41-2.83L14 16.75l-1.41 1.41L15.41 21 20 16.42 18.58 15l-3.17 3.17zM4 3v2h16V3H4z\"/>")
      .name("GradingOutlined")
  }
}

export default GradingOutlined as any as Typed<DLightIconType>
