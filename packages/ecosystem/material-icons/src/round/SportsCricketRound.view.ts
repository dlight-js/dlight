import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SportsCricketRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.05 12.81 6.56 4.32a.996.996 0 0 0-1.41 0L2.32 7.15a.996.996 0 0 0 0 1.41l8.49 8.49c.39.39 1.02.39 1.41 0l2.83-2.83a.996.996 0 0 0 0-1.41zm-.71 4.95 3.53 3.53c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42l-3.53-3.53-1.42 1.42z\"/><circle cx=\"18.5\" cy=\"5.5\" r=\"3.5\"/>")
      .name("SportsCricketRound")
  }
}

export default SportsCricketRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
