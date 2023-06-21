import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalShadesRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1h-1zm-10 0V5h4v14h-4z\"/>")
      .name("VerticalShadesRound")
  }
}

export default VerticalShadesRound as any as Typed<DLightIconType>
