import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LunchDiningRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.37 14.28c.79-.29 1.17-.78 1.99-.78 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 .81 0 1.17.46 1.93.76.67.26 1.39-.25 1.39-.96 0-.43-.28-.81-.69-.96-.97-.35-1.22-.83-2.65-.83-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.55 0-1.96.63-2.68.89-.39.14-.65.52-.65.94 0 .69.7 1.18 1.36.94zM2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v1zM22 9c.02-4-4.28-6-10-6C6.29 3 2 5 2 9c0 .55.45 1 1 1h18c.55 0 1-.45 1-1z\"/>")
      .name("LunchDiningRound")
  }
}

export default LunchDiningRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
