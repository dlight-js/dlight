import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HMobiledataFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 11H9V7H7v10h2v-4h6v4h2V7h-2v4z\"/>")
      .name("HMobiledataFilled")
  }
}

export default HMobiledataFilled as any as Typed<DLightIconType>
