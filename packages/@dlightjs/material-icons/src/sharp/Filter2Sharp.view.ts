import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Filter2Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5H1v18h18v-2H3V5zm20-4H5v18h18V1zm-2 16H7V3h14v14zm-4-4h-4v-2h4V5h-6v2h4v2h-4v6h6v-2z\"/>")
      .name("Filter2Sharp")
  }
}

export default Filter2Sharp as any as Typed<DLightIconType>
