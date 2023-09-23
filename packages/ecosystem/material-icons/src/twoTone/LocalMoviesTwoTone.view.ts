import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalMoviesTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 5h4v14h-4z\" opacity=\".3\"/><path d=\"M20 21V3h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm2-12h2v2h-2V7zm0 4h2v2h-2v-2zm0 6v-2h2v2h-2z\"/>")
      .name("LocalMoviesTwoTone")
  }
}

export default LocalMoviesTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
