import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewInArSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 1v2h3v3h2V1zm3 20h-3v2h5v-5h-2zM3 3h3V1H1v5h2zm0 15H1v5h5v-2H3zM19 7.97l-7-4.03-7 4.03v8.06l7 4.03 7-4.03V7.97zm-8 9.2-4-2.3v-4.63l4 2.33v4.6zm1-6.33L8.04 8.53 12 6.25l3.96 2.28L12 10.84zm5 4.03-4 2.3v-4.6l4-2.33v4.63z\"/>")
      .name("ViewInArSharp")
  }
}

export default ViewInArSharp as any as Typed<DLightIconType>
