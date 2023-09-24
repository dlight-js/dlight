import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallMissedOutgoingRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m3.7 9.11 7.59 7.59c.39.39 1.02.39 1.41 0l6.3-6.3V14c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1s.45 1 1 1h3.59L12 14.59 5.11 7.7a.996.996 0 0 0-1.41 0c-.38.39-.38 1.03 0 1.41z\"/>")
      .name("CallMissedOutgoingRound")
  }
}

export default CallMissedOutgoingRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
