import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GetAppOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 5v6h1.17L12 13.17 9.83 11H11V5h2m2-2H9v6H5l7 7 7-7h-4V3zm4 15H5v2h14v-2z\"/>")
      .name("GetAppOutlined")
  }
}

export default GetAppOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
