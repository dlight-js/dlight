import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FaxRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9h-1V6c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v14h12c1.1 0 2-.9 2-2v-6c0-1.66-1.34-3-3-3zm-9-3h6v3h-6V6zm4 11h-4v-5h4v5zm2 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM4.5 8A2.5 2.5 0 0 0 2 10.5v8a2.5 2.5 0 0 0 5 0v-8A2.5 2.5 0 0 0 4.5 8z\"/>")
      .name("FaxRound")
  }
}

export default FaxRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
