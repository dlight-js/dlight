import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WhereToVoteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.53 12-3.48-3.48L8.4 9.1l2.07 2.07 5.13-5.14 1.41 1.42L10.47 14z\"/>")
      .name("WhereToVoteSharp")
  }
}

export default WhereToVoteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
