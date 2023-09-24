import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MuseumTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 20h12V9H6v11zm2-9h2l2 3 2-3h2v7h-2v-4l-2 3-2-3v4H8v-7z\" opacity=\".3\"/><path d=\"M22 11V9L12 2 2 9v2h2v9H2v2h20v-2h-2v-9h2zm-4 9H6V9h12v11z\"/><path d=\"m10 14 2 3 2-3v4h2v-7h-2l-2 3-2-3H8v7h2z\"/>")
      .name("MuseumTwoTone")
  }
}

export default MuseumTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
