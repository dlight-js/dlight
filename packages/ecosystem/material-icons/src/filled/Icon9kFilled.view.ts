import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon9kFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 10h1.5v1.5H8zm11-7H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 11c0 .55-.45 1-1 1H6.5v-1.5h3v-1h-2c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1H10c.55 0 1 .45 1 1v4zm7 1h-1.75l-1.75-2.25V15H13V9h1.5v2.25L16.25 9H18l-2.25 3L18 15z\"/>")
      .name("Icon9kFilled")
  }
}

export default Icon9kFilled as any as Typed<DLightIconType>
