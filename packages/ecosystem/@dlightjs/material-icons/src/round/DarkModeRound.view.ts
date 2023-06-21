import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DarkModeRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8 .09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89.45-.67-.04-1.63-.93-1.56z\"/>")
      .name("DarkModeRound")
  }
}

export default DarkModeRound as any as Typed<DLightIconType>
