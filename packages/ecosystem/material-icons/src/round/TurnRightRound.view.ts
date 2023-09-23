import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TurnRightRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.29 13.29c.39.39 1.02.39 1.41 0l2.59-2.59a.996.996 0 0 0 0-1.41L17.7 6.7a.996.996 0 1 0-1.41 1.41l.88.89H9c-1.1 0-2 .9-2 2v8c0 .55.45 1 1 1s1-.45 1-1v-8h8.17l-.88.88a.996.996 0 0 0 0 1.41z\"/>")
      .name("TurnRightRound")
  }
}

export default TurnRightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
