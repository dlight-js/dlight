import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WbTwilightRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19.07 9.37.71-.71a.996.996 0 1 0-1.41-1.41l-.71.71a.996.996 0 1 0 1.41 1.41zM21 18H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1zM12 7c.56 0 1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zM4.96 9.34a.996.996 0 1 0 1.41-1.41l-.71-.71a.996.996 0 1 0-1.41 1.41l.71.71zM19 16c0-3.87-3.13-7-7-7s-7 3.13-7 7h14z\"/>")
      .name("WbTwilightRound")
  }
}

export default WbTwilightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
