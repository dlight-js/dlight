import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BallotSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 9.5h5v-2h-5v2zm0 7h5v-2h-5v2zm8 4.5H3V3h18v18zM6 11h5V6H6v5zm1-4h3v3H7V7zM6 18h5v-5H6v5zm1-4h3v3H7v-3z\"/>")
      .name("BallotSharp")
  }
}

export default BallotSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
