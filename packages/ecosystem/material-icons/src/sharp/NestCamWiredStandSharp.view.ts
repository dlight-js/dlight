import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NestCamWiredStandSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 .85-6.02.55C8.95 1.7 6.37 4 6.04 7.03a6.362 6.362 0 0 0 5.68 7.04l1.9.19-.56.85c-.88-.19-1.83-.18-2.85.25-2 .85-3.21 2.89-3.21 5.05V23h10v-3c0-1.67-.83-3.15-2.09-4.06l.97-1.45 2.12.23V.85z\"/>")
      .name("NestCamWiredStandSharp")
  }
}

export default NestCamWiredStandSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
