import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MovieTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 10H5.76L4 6.47V18h16z\" opacity=\".3\"/><path d=\"M2.01 6 2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2zM4 6.47 5.76 10H20v8H4V6.47z\"/>")
      .name("MovieTwoTone")
  }
}

export default MovieTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
