import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TurnSlightRightRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.34 5c0-.55.45-1 1-1H17c.55 0 1 .45 1 1v3.66c0 .55-.45 1-1 1s-1-.45-1-1V7.41l-5 5V19c0 .55-.45 1-1 1s-1-.45-1-1v-6.58c0-.53.21-1.04.59-1.41l5-5h-1.24A1.02 1.02 0 0 1 12.34 5z\"/>")
      .name("TurnSlightRightRound")
  }
}

export default TurnSlightRightRound as any as Typed<DLightIconType>
