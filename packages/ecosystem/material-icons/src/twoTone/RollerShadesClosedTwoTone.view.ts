import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RollerShadesClosedTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 5h12v10H6z\" opacity=\".3\"/><path d=\"M20 19V3H4v16H2v2h8.25c0 .97.78 1.75 1.75 1.75s1.75-.78 1.75-1.75H22v-2h-2zm-9 0H6v-2h5v2zm7 0h-5v-2h5v2zm0-4H6V5h12v10z\"/>")
      .name("RollerShadesClosedTwoTone")
  }
}

export default RollerShadesClosedTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
