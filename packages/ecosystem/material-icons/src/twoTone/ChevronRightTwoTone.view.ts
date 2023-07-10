import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChevronRightTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z\"/>")
      .name("ChevronRightTwoTone")
  }
}

export default ChevronRightTwoTone as any as Typed<DLightIconType>
