import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BackHandSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.21 10.47 5 9.36 7.25 15H8V2h2.5v10h1V0H14v12h1V1.5h2.5V12h1V4.5H21V16c0 4.42-3.58 8-8 8-3.26 0-6.19-1.99-7.4-5.02l-3.39-8.51z\"/>")
      .name("BackHandSharp")
  }
}

export default BackHandSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
