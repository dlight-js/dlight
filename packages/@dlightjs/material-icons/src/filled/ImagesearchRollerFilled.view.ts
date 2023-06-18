import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ImagesearchRollerFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2v6H6V6H4v4h10v5h2v8h-6v-8h2v-3H2V4h4V2\"/>")
      .name("ImagesearchRollerFilled")
  }
}

export default ImagesearchRollerFilled as any as Typed<DLightIconType>
