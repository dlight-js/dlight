import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Looks4Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.04 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-14V5h14v14zm-6-2h2V7h-2v4h-2V7h-2v6h4z\"/>")
      .name("Looks4Outlined")
  }
}

export default Looks4Outlined as any as Typed<DLightIconType>
