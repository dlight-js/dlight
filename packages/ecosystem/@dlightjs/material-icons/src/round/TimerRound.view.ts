import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TimerRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 3h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm9.03 4.39.75-.75a.993.993 0 0 0 0-1.4l-.01-.01a.993.993 0 0 0-1.4 0l-.75.75A8.962 8.962 0 0 0 12 4c-4.8 0-8.88 3.96-9 8.76A8.998 8.998 0 0 0 12 22a8.994 8.994 0 0 0 7.03-14.61zM13 13c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v4z\"/>")
      .name("TimerRound")
  }
}

export default TimerRound as any as Typed<DLightIconType>
