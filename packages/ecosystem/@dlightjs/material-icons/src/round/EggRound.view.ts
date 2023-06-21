import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EggRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3C8.5 3 5 9.33 5 14c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4.67-3.5-11-7-11zm1 15c-3 0-5-1.99-5-5 0-.55.45-1 1-1s1 .45 1 1c0 2.92 2.42 3 3 3 .55 0 1 .45 1 1s-.45 1-1 1z\"/>")
      .name("EggRound")
  }
}

export default EggRound as any as Typed<DLightIconType>
