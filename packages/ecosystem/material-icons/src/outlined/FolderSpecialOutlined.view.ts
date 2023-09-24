import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FolderSpecialOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-6.92-3.96L12.39 17 15 15.47 17.61 17l-.69-2.96 2.3-1.99-3.03-.26L15 9l-1.19 2.79-3.03.26z\"/>")
      .name("FolderSpecialOutlined")
  }
}

export default FolderSpecialOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
