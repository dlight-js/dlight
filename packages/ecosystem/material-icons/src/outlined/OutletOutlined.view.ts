import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class OutletOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 9V8c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1s1-.45 1-1zm6 0V8c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1s1-.45 1-1zm-2 5c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2z\"/>")
      .name("OutletOutlined")
  }
}

export default OutletOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
