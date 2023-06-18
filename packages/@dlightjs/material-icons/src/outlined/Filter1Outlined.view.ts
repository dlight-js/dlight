import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Filter1Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 10h2V5h-4v2h2v8zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z\"/>")
      .name("Filter1Outlined")
  }
}

export default Filter1Outlined as any as Typed<DLightIconType>
