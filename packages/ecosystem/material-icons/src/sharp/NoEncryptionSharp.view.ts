import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoEncryptionSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2h-4.66L20 17.56V8h-3V6.22c0-2.61-1.91-4.94-4.51-5.19-2.53-.25-4.72 1.41-5.32 3.7L8.9 6.46V6zM4.41 4.81 3 6.22 4.78 8H4v14h14.78l1 1 1.41-1.41z\"/>")
      .name("NoEncryptionSharp")
  }
}

export default NoEncryptionSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
