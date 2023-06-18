import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ElectricMeterFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2c-4.96 0-9 4.04-9 9 0 3.91 2.51 7.24 6 8.47V22h2v-2.06a8.262 8.262 0 0 0 2 0V22h2v-2.53c3.49-1.24 6-4.57 6-8.47 0-4.96-4.04-9-9-9zm2.25 12-3 3-1.5-1.5L11 14.25 9.75 13l3-3 1.5 1.5L13 12.75 14.25 14zM16 9H8V7h8v2z\"/>")
      .name("ElectricMeterFilled")
  }
}

export default ElectricMeterFilled as any as Typed<DLightIconType>