import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WindowFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 11V3H5c-1.1 0-2 .9-2 2v6h8zm2 0h8V5c0-1.1-.9-2-2-2h-6v8zm-2 2H3v6c0 1.1.9 2 2 2h6v-8zm2 0v8h6c1.1 0 2-.9 2-2v-6h-8z\"/>")
      .name("WindowFilled")
  }
}

export default WindowFilled as any as Typed<DLightIconType>
