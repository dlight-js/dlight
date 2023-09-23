import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DomainAddRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm6 12h-4v-2h2v-2h-2v-2h2v-2h-2V9h8v6h2V8c0-.55-.45-1-1-1h-9V4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h13v-2zm2-8h-2v2h2v-2zm0 4h-2v2h2v-2zm6 5c0 .55-.45 1-1 1h-1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-1c-.55 0-1-.45-1-1s.45-1 1-1h1v-1c0-.55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1z\"/>")
      .name("DomainAddRound")
  }
}

export default DomainAddRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
