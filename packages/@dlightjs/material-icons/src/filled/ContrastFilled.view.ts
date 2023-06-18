import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ContrastFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z\"/>")
      .name("ContrastFilled")
  }
}

export default ContrastFilled as any as Typed<DLightIconType>
