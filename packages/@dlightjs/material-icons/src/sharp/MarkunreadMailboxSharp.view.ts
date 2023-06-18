import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkunreadMailboxSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6H10v6H8V4h6V0H6v6H2v16h20V6z\"/>")
      .name("MarkunreadMailboxSharp")
  }
}

export default MarkunreadMailboxSharp as any as Typed<DLightIconType>
