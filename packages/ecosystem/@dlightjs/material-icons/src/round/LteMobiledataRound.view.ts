import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LteMobiledataRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 14h2c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v5zm4-4h1v5c0 .55.45 1 1 1s1-.45 1-1v-5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm11-1c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2v-1h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-1h2c.55 0 1-.45 1-1z\"/>")
      .name("LteMobiledataRound")
  }
}

export default LteMobiledataRound as any as Typed<DLightIconType>
