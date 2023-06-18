import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SdStorageOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4v16H6V8.83L10.83 4H18m0-2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 7h2v4H9zm3 0h2v4h-2zm3 0h2v4h-2z\"/>")
      .name("SdStorageOutlined")
  }
}

export default SdStorageOutlined as any as Typed<DLightIconType>
