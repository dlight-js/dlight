import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MovieCreationTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6.47V18h16v-8H5.76z\" opacity=\".3\"/><path d=\"m18 4 2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm2 14H4V6.47L5.76 10H20v8z\"/>")
      .name("MovieCreationTwoTone")
  }
}

export default MovieCreationTwoTone as any as Typed<DLightIconType>
