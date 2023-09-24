import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SentimentNeutralFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 15.5h6v1H9v-1z\"/><circle cx=\"15.5\" cy=\"9.5\" r=\"1.5\"/><circle cx=\"8.5\" cy=\"9.5\" r=\"1.5\"/><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>")
      .name("SentimentNeutralFilled")
  }
}

export default SentimentNeutralFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
