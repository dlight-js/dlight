import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NetworkLockedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 16v-.36c0-1.31-.94-2.5-2.24-2.63A2.5 2.5 0 0 0 17 15.5v.5h-1v6h7v-6h-1zm-1 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.5zm-1.5-5c.15 0 .3.01.46.02.01 0 .03.01.04.01V1L1 20h13v-6h1.26c.22-.63.58-1.2 1.06-1.68.85-.85 1.98-1.32 3.18-1.32z\"/>")
      .name("NetworkLockedSharp")
  }
}

export default NetworkLockedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
