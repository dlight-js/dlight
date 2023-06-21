import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WbShadeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 12v2.5l5.5 5.5H22l-8-8zm0 8h3l-3-3v3zM8 4l-6 6h2v10h8V10h2L8 4zm1 10H7v-4h2v4z\"/>")
      .name("WbShadeSharp")
  }
}

export default WbShadeSharp as any as Typed<DLightIconType>
