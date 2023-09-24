import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MeetingRoomOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V4h-4V3H5v16H3v2h12V6h2v15h4v-2h-2zm-6 0H7V5h6v14zm-3-8h2v2h-2z\"/>")
      .name("MeetingRoomOutlined")
  }
}

export default MeetingRoomOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
