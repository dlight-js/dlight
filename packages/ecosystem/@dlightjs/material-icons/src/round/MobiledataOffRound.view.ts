import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MobiledataOffRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.2-.2-.51-.2-.71 0l-2.79 2.79a.5.5 0 0 0 .36.85H14v4.17l2 2V7zM2.1 3.51a.996.996 0 0 0 0 1.41l5.9 5.9V17H6.21c-.45 0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 0l2.79-2.79c.32-.32.09-.85-.35-.85h-1.79v-4.18l9.07 9.07a.996.996 0 1 0 1.41-1.41L3.51 3.51a.996.996 0 0 0-1.41 0z\"/>")
      .name("MobiledataOffRound")
  }
}

export default MobiledataOffRound as any as Typed<DLightIconType>
