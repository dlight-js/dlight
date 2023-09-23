import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CancelPresentationSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 3v18h22V3H1zm20 16H3V5h18v14zM9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59z\"/>")
      .name("CancelPresentationSharp")
  }
}

export default CancelPresentationSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
