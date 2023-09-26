import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GroupOffOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4h-.18l-.77-.77c.6-.94.95-2.05.95-3.23zm7.83 12H23v-3c0-2.18-3.58-3.47-6.34-3.87 1.1.75 1.95 1.71 2.23 2.94L22.83 20zM9 6c-.06 0-.11 0-.16.01l-1.6-1.6a3.996 3.996 0 0 1 5.35 5.35l-1.6-1.6c.01-.05.01-.1.01-.16 0-1.1-.9-2-2-2zm.17 6H9c-2.21 0-4-1.79-4-4v-.17L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41L17 19.83V20H1v-3c0-2.66 5.33-4 8-4 .37 0 .8.03 1.25.08L9.17 12zM9 15c-2.7 0-5.8 1.29-6 2.01V18h12v-.17l-2.11-2.11C11.76 15.31 10.33 15 9 15z\"/>")
      .name("GroupOffOutlined")
  }
}

export default GroupOffOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
