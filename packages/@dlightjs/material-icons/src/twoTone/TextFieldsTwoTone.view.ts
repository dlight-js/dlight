import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextFieldsTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.5 12h3v7h3v-7h3V9h-9zm3-8h-13v3h5v12h3V7h5z\"/>")
      .name("TextFieldsTwoTone")
  }
}

export default TextFieldsTwoTone as any as Typed<DLightIconType>
