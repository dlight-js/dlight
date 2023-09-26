import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewComfyAltOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 7h4v4H7zm6 0h4v4h-4zm-6 6h4v4H7zm6 0h4v4h-4z\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z\"/>")
      .name("ViewComfyAltOutlined")
  }
}

export default ViewComfyAltOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
