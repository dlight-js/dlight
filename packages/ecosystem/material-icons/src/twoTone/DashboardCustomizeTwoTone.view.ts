import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DashboardCustomizeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 15h4v4H5zM5 5h4v4H5zm10 0h4v4h-4z\" opacity=\".3\"/><path d=\"M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3z\"/>")
      .name("DashboardCustomizeTwoTone")
  }
}

export default DashboardCustomizeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
