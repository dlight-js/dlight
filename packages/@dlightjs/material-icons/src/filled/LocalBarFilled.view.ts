import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalBarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7 5.66 5h12.69l-1.78 2H7.43z\"/>")
      .name("LocalBarFilled")
  }
}

export default LocalBarFilled as any as Typed<DLightIconType>
