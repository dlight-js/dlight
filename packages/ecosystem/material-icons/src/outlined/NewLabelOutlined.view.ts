import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NewLabelOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 12-4.37 6.16c-.37.52-.98.84-1.63.84h-3v-2h3l3.55-5L15 7H5v3H3V7c0-1.1.9-2 2-2h10c.65 0 1.26.31 1.63.84L21 12zm-11 3H7v-3H5v3H2v2h3v3h2v-3h3v-2z\"/>")
      .name("NewLabelOutlined")
  }
}

export default NewLabelOutlined as any as Typed<DLightIconType>
