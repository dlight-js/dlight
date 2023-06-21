import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalPharmacySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z\"/>")
      .name("LocalPharmacySharp")
  }
}

export default LocalPharmacySharp as any as Typed<DLightIconType>
