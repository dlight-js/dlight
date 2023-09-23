import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PentagonTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.63 9.78 16.56 19H7.44L4.37 9.78 12 4.44z\" opacity=\".3\"/><path d=\"M19.63 9.78 16.56 19H7.44L4.37 9.78 12 4.44l7.63 5.34zM2 9l4 12h12l4-12-10-7L2 9z\"/>")
      .name("PentagonTwoTone")
  }
}

export default PentagonTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
