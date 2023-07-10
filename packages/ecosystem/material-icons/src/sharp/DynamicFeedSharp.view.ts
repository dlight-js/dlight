import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DynamicFeedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 8H6v9h11v-2H8z\"/><path d=\"M22 3H10v10h12V3zm-2 8h-8V7h8v4zM4 12H2v9h11v-2H4z\"/>")
      .name("DynamicFeedSharp")
  }
}

export default DynamicFeedSharp as any as Typed<DLightIconType>
