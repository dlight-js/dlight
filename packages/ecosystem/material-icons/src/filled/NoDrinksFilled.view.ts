import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoDrinksFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.83 3H21v2l-6.2 6.97L9.83 7h6.74l1.78-2H7.83l-2-2zm13.95 19.61L18 20.83V21H6v-2h5v-5l-1.37-1.54-8.24-8.24L2.8 2.81 3 3l18.19 18.19-1.41 1.42zM16.17 19 13 15.83V19h3.17z\"/>")
      .name("NoDrinksFilled")
  }
}

export default NoDrinksFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
