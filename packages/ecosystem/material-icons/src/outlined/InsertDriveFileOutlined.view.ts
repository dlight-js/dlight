import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InsertDriveFileOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z\"/>")
      .name("InsertDriveFileOutlined")
  }
}

export default InsertDriveFileOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
