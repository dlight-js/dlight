import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RequestQuoteSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H4v20h16V8l-6-6zm1 10h-4v1h4v5h-2v1h-2v-1H9v-2h4v-1H9v-5h2V9h2v1h2v2zm-2-4V3.5L17.5 8H13z\"/>")
      .name("RequestQuoteSharp")
  }
}

export default RequestQuoteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
