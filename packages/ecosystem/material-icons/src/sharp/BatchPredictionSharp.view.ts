import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BatchPredictionSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 8H5v14h14V8zm-6 12.5h-2V19h2v1.5zm0-2.5h-2c0-1.5-2.5-3-2.5-5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 2-2.5 3.5-2.5 5zm5-11.5H6V5h12v1.5zm-1-3H7V2h10v1.5z\"/>")
      .name("BatchPredictionSharp")
  }
}

export default BatchPredictionSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
