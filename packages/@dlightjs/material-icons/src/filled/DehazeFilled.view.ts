import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DehazeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z\"/>")
      .name("DehazeFilled")
  }
}

export default DehazeFilled as any as Typed<DLightIconType>
