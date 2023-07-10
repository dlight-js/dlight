import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HeightTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 6.99h3L12 3 8 6.99h3v10.02H8L12 21l4-3.99h-3z\"/>")
      .name("HeightTwoTone")
  }
}

export default HeightTwoTone as any as Typed<DLightIconType>
