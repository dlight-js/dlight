import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AddHomeOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 5.5 6 4.5v1c.7 0 1.37.1 2 .29V9l-8-6-8 6v12h7.68c-.3-.62-.5-1.29-.6-2H6v-9l6-4.5z\"/><path d=\"M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm3 5.5h-2.5V21h-1v-2.5H15v-1h2.5V15h1v2.5H21v1z\"/>")
      .name("AddHomeOutlined")
  }
}

export default AddHomeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
