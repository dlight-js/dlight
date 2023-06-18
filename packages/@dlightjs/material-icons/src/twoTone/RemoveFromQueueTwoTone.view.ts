import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RemoveFromQueueTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18V5H3v12zm5-7h8v2H8v-2z\" opacity=\".3\"/><path d=\"M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 14H3V5h18v12zM8 10h8v2H8z\"/>")
      .name("RemoveFromQueueTwoTone")
  }
}

export default RemoveFromQueueTwoTone as any as Typed<DLightIconType>
