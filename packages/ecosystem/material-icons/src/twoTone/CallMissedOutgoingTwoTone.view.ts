import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CallMissedOutgoingTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 10.41V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41l9 9z\"/>")
      .name("CallMissedOutgoingTwoTone")
  }
}

export default CallMissedOutgoingTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
