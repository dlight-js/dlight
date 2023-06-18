import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InstallMobileSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 18H7V6h7V1H5v22h14v-7h-2z\"/><path d=\"m18 14 5-5-1.41-1.41L19 10.17V3h-2v7.17l-2.59-2.58L13 9z\"/>")
      .name("InstallMobileSharp")
  }
}

export default InstallMobileSharp as any as Typed<DLightIconType>
