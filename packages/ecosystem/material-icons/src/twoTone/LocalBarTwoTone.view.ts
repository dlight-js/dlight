import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalBarTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.23 9 12 12.11 14.77 9z\" opacity=\".3\"/><path d=\"M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM5.66 5h12.69l-1.78 2H7.43L5.66 5zM12 12.11 9.23 9h5.54L12 12.11z\"/>")
      .name("LocalBarTwoTone")
  }
}

export default LocalBarTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
