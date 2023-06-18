import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotationNoneOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 18-3-3v2H5v2h13v2l3-3zM9.5 11.8h5l.9 2.2h2.1L12.75 3h-1.5L6.5 14h2.1l.9-2.2zM12 4.98 13.87 10h-3.74L12 4.98z\"/>")
      .name("TextRotationNoneOutlined")
  }
}

export default TextRotationNoneOutlined as any as Typed<DLightIconType>
