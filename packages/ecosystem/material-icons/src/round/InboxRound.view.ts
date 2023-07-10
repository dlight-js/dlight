import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InboxRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v9h-3.56c-.36 0-.68.19-.86.5-.52.9-1.47 1.5-2.58 1.5s-2.06-.6-2.58-1.5a1 1 0 0 0-.86-.5H5V5h14z\"/>")
      .name("InboxRound")
  }
}

export default InboxRound as any as Typed<DLightIconType>
