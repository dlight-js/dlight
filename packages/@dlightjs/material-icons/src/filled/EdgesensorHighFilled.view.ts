import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EdgesensorHighFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 7h2v7H3V7zm-3 3h2v7H0v-7zm22-3h2v7h-2V7zm-3 3h2v7h-2v-7zm-3-7.99L8 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-1.99-2-1.99zM16 17H8V7h8v10z\"/>")
      .name("EdgesensorHighFilled")
  }
}

export default EdgesensorHighFilled as any as Typed<DLightIconType>
