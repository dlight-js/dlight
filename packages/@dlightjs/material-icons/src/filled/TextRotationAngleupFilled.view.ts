import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotationAngleupFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.49 4.21 3.43 5.27 7.85 16.4l1.48-1.48-.92-2.19 3.54-3.54 2.19.92 1.48-1.48L4.49 4.21zm3.09 6.8L5.36 6.14l4.87 2.23-2.65 2.64zm12.99-1.68h-4.24l1.41 1.41-8.84 8.84L10.32 21l8.84-8.84 1.41 1.41V9.33z\"/>")
      .name("TextRotationAngleupFilled")
  }
}

export default TextRotationAngleupFilled as any as Typed<DLightIconType>
