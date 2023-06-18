import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideocamSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10.5V6H3v12h14v-4.5l4 4v-11l-4 4z\"/>")
      .name("VideocamSharp")
  }
}

export default VideocamSharp as any as Typed<DLightIconType>
