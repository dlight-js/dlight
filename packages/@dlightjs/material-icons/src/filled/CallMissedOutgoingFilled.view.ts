import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CallMissedOutgoingFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m3 8.41 9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z\"/>")
      .name("CallMissedOutgoingFilled")
  }
}

export default CallMissedOutgoingFilled as any as Typed<DLightIconType>
