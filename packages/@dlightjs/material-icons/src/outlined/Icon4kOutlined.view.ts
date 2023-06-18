import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon4kOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zm-9.5-4H11v-1.49h1V12h-1V9H9.5v3H8V9H6.5v4.5h3zm8.7 0-2-3 2-3h-1.7l-2 3 2 3zm-3.7-3V9H13v6h1.5z\"/>")
      .name("Icon4kOutlined")
  }
}

export default Icon4kOutlined as any as Typed<DLightIconType>
