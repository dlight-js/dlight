import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowRightAltFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.01 11H4v2h12.01v3L20 12l-3.99-4z\"/>")
      .name("ArrowRightAltFilled")
  }
}

export default ArrowRightAltFilled as any as Typed<DLightIconType>
