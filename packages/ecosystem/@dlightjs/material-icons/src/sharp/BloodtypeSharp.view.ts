import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BloodtypeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm3 16H9v-2h6v2zm0-5h-2v2h-2v-2H9v-2h2V9h2v2h2v2z\"/>")
      .name("BloodtypeSharp")
  }
}

export default BloodtypeSharp as any as Typed<DLightIconType>
