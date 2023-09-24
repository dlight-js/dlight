import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HPlusMobiledataOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 11H6V7H4v10h2v-4h6v4h2V7h-2v4zm10 0h-2V9h-2v2h-2v2h2v2h2v-2h2v-2z\"/>")
      .name("HPlusMobiledataOutlined")
  }
}

export default HPlusMobiledataOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
