import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SportsGymnasticsTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM1 9h6l7-5 1.31 1.52-4.17 2.98H14L21.8 4 23 5.4 14.5 12 14 22h-2l-.5-10L8 11H1V9z\"/>")
      .name("SportsGymnasticsTwoTone")
  }
}

export default SportsGymnasticsTwoTone as any as Typed<DLightIconType>
