import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Filter6Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5H1v18h18v-2H3V5zm20-4H5v18h18V1zm-2 16H7V3h14v14zm-10-2h6V9h-4V7h4V5h-6v10zm2-4h2v2h-2v-2z\"/>")
      .name("Filter6Sharp")
  }
}

export default Filter6Sharp as any as Typed<DLightIconType>
