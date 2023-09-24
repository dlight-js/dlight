import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RoomServiceTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 9.58c-2.95 0-5.47 1.83-6.5 4.41h13A7.002 7.002 0 0 0 12 9.58z\" opacity=\".3\"/><path d=\"M2 17h20v2H2zm11.84-9.21A2.006 2.006 0 0 0 12 5a2.006 2.006 0 0 0-1.84 2.79C6.25 8.6 3.27 11.93 3 16h18c-.27-4.07-3.25-7.4-7.16-8.21zM12 9.58c2.95 0 5.47 1.83 6.5 4.41h-13A7.002 7.002 0 0 1 12 9.58z\"/>")
      .name("RoomServiceTwoTone")
  }
}

export default RoomServiceTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
