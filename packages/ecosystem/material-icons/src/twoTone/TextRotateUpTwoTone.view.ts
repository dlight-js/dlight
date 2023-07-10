import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotateUpTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 4-3 3h2v13h2V7h2l-3-3zm-6.2 11.5v-5l2.2-.9V7.5L3 12.25v1.5l11 4.75v-2.1l-2.2-.9zM4.98 13 10 11.13v3.74L4.98 13z\"/>")
      .name("TextRotateUpTwoTone")
  }
}

export default TextRotateUpTwoTone as any as Typed<DLightIconType>
