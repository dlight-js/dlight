import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoorBackOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14z\"/><path d=\"M9 11h2v2H9z\"/>")
      .name("DoorBackOutlined")
  }
}

export default DoorBackOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
