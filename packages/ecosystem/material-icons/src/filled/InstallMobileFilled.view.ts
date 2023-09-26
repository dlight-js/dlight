import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InstallMobileFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 18H7V6h7V1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-5h-2v2z\"/><path d=\"m18 14 5-5-1.41-1.41L19 10.17V3h-2v7.17l-2.59-2.58L13 9z\"/>")
      .name("InstallMobileFilled")
  }
}

export default InstallMobileFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
