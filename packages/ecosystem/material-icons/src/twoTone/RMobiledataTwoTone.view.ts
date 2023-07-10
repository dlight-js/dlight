import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RMobiledataTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.8 7.2 9 10H7L5.87 7.33H4V10H2V2h5c1.13 0 2 .87 2 2v1.33c0 .8-.53 1.54-1.2 1.87zM7 4H4v1.33h3V4z\"/>")
      .name("RMobiledataTwoTone")
  }
}

export default RMobiledataTwoTone as any as Typed<DLightIconType>
