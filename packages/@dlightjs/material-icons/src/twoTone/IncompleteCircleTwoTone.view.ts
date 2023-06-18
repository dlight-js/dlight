import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class IncompleteCircleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07L12 12V2c5.52 0 10 4.48 10 10z\"/>")
      .name("IncompleteCircleTwoTone")
  }
}

export default IncompleteCircleTwoTone as any as Typed<DLightIconType>
