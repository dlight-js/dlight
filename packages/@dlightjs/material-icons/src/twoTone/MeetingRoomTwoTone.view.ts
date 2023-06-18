import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MeetingRoomTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 19h6V5H7v14zm3-8h2v2h-2v-2z\" opacity=\".3\"/><path d=\"M19 19V4h-4V3H5v16H3v2h12V6h2v15h4v-2h-2zm-6 0H7V5h6v14zm-3-8h2v2h-2z\"/>")
      .name("MeetingRoomTwoTone")
  }
}

export default MeetingRoomTwoTone as any as Typed<DLightIconType>
