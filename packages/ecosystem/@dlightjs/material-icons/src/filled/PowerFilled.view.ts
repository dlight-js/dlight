import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PowerFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.01 7 16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z\"/>")
      .name("PowerFilled")
  }
}

export default PowerFilled as any as Typed<DLightIconType>
