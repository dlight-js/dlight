import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class GMobiledataRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 12c0 .55.45 1 1 1h1v2H9V9h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1z\"/>")
      .name("GMobiledataRound")
  }
}

export default GMobiledataRound as any as Typed<DLightIconType>
