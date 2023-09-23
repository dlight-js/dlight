import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddIcCallSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 6h-3V3h-2v3h-3v2h3v3h2V8h3zm0 9.46-5.27-.61-2.52 2.52a15.045 15.045 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z\"/>")
      .name("AddIcCallSharp")
  }
}

export default AddIcCallSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
