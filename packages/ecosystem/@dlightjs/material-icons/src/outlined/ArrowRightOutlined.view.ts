import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowRightOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m10 17 5-5-5-5v10z\"/>")
      .name("ArrowRightOutlined")
  }
}

export default ArrowRightOutlined as any as Typed<DLightIconType>
