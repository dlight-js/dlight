import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlinesRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.59 4h-5.01c-.99 0-1.91.49-2.47 1.3L2 20h17l2.56-13.63C21.79 5.14 20.84 4 19.59 4zM14.5 14a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z\"/>")
      .name("AirlinesRound")
  }
}

export default AirlinesRound as any as Typed<DLightIconType>
