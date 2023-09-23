import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LiquorSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 14c0 1.3.84 2.4 2 2.82V20H3v2h6v-2H7v-3.18C8.16 16.4 9 15.3 9 14V6H3v8zm2-6h2v3H5V8zm17 1-3-1.01V2h-5v6l-3 1.01V22h11V9zm-6-5h1v1h-1V4zm-3 6.44 3-.98V7h1v2.46l3 .98V12h-7v-1.56zM20 20h-7v-2h7v2z\"/>")
      .name("LiquorSharp")
  }
}

export default LiquorSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
