import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GolfCourseOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"19.5\" cy=\"19.5\" r=\"1.5\"/><path d=\"M17 5.92 9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z\"/>")
      .name("GolfCourseOutlined")
  }
}

export default GolfCourseOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
