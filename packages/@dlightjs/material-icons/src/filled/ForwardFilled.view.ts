import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForwardFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 8V4l8 8-8 8v-4H4V8z\"/>")
      .name("ForwardFilled")
  }
}

export default ForwardFilled as any as Typed<DLightIconType>
