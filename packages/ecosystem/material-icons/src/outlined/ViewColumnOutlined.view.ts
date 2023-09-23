import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewColumnOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5v14h18V5H3zm5.33 12H5V7h3.33v10zm5.34 0h-3.33V7h3.33v10zM19 17h-3.33V7H19v10z\"/>")
      .name("ViewColumnOutlined")
  }
}

export default ViewColumnOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
