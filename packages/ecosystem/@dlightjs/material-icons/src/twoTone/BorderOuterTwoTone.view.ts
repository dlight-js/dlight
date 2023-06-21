import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BorderOuterTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 11h2v2h-2zm0-4h2v2h-2zm10-4H3v18h18V3zm-2 16H5V5h14v14zm-4-8h2v2h-2zm-8 0h2v2H7zm4 4h2v2h-2z\"/>")
      .name("BorderOuterTwoTone")
  }
}

export default BorderOuterTwoTone as any as Typed<DLightIconType>
