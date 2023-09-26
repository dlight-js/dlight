import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PauseCircleFilledTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 12H9V8h2v8zm4 0h-2V8h2v8z\" opacity=\".3\"/><path d=\"M13 8h2v8h-2zM9 8h2v8H9z\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>")
      .name("PauseCircleFilledTwoTone")
  }
}

export default PauseCircleFilledTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
