import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideoChatRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2H4c-1.1 0-1.99.9-1.99 2L2 19.58c0 .89 1.08 1.34 1.71.71L6 18h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3.85 10.15L15 11.01V13c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v1.99l1.15-1.14c.31-.32.85-.09.85.35v3.59c0 .45-.54.68-.85.36z\"/>")
      .name("VideoChatRound")
  }
}

export default VideoChatRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
