import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HomeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z\"/>")
      .name("HomeOutlined")
  }
}

export default HomeOutlined as any as Typed<DLightIconType>
