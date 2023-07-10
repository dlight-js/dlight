import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PublishTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.83 12H11v6h2v-6h1.17L12 9.83z\" opacity=\".3\"/><path d=\"M5 4h14v2H5zm7 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2v-6H9.83L12 9.83 14.17 12H13z\"/>")
      .name("PublishTwoTone")
  }
}

export default PublishTwoTone as any as Typed<DLightIconType>
