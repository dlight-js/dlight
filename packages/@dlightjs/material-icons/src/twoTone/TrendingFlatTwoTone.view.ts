import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TrendingFlatTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 12-4-4v3H3v2h15v3l4-4z\"/>")
      .name("TrendingFlatTwoTone")
  }
}

export default TrendingFlatTwoTone as any as Typed<DLightIconType>