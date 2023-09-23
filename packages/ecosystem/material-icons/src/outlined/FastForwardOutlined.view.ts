import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FastForwardOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 9.86 18.03 12 15 14.14V9.86m-9 0L9.03 12 6 14.14V9.86M13 6v12l8.5-6L13 6zM4 6v12l8.5-6L4 6z\"/>")
      .name("FastForwardOutlined")
  }
}

export default FastForwardOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
