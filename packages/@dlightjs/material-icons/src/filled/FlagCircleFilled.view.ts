import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlagCircleFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 13h-5l-1-2H9.5v5H8V7h6l1 2h3v6z\"/>")
      .name("FlagCircleFilled")
  }
}

export default FlagCircleFilled as any as Typed<DLightIconType>
