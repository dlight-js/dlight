import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NetworkPingRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.71 6.79a.996.996 0 0 0 0 1.41L10.5 16H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1h-5.5l5.15-5.15A2.5 2.5 0 1 0 19.5 6 2.5 2.5 0 0 0 17 8.5c0 .35.07.67.2.97l-5.2 5.2-7.88-7.88a.996.996 0 0 0-1.41 0z\"/>")
      .name("NetworkPingRound")
  }
}

export default NetworkPingRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
