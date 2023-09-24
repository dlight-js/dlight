import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewSidebarSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 20H2V4h14v16zm2-12h4V4h-4v4zm0 12h4v-4h-4v4zm0-6h4v-4h-4v4z\"/>")
      .name("ViewSidebarSharp")
  }
}

export default ViewSidebarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
