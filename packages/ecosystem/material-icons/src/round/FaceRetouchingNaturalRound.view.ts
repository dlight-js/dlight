import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FaceRetouchingNaturalRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22.01 4.05 20.6 3.4l-.65-1.41a.5.5 0 0 0-.91 0L18.4 3.4l-1.41.65a.5.5 0 0 0 0 .91l1.41.64.65 1.41a.5.5 0 0 0 .91 0l.64-1.41 1.41-.65c.39-.17.39-.73 0-.9z\"/><circle cx=\"9\" cy=\"13\" r=\"1.25\"/><circle cx=\"15\" cy=\"13\" r=\"1.25\"/><path d=\"M19.5 8.8c-.78 0-1.49-.46-1.82-1.17l-.41-.9-.9-.41A2.014 2.014 0 0 1 15.2 4.5c0-.66.34-1.26.87-1.63C14.83 2.32 13.45 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.45-.32-2.83-.87-4.07-.37.53-.97.87-1.63.87zM12 20c-4.41 0-8-3.59-8-8 0-.05.01-.1 0-.14 2.6-.98 4.69-2.99 5.74-5.55A10 10 0 0 0 17.5 10c.75 0 1.47-.09 2.17-.24.21.71.33 1.46.33 2.24 0 4.41-3.59 8-8 8z\"/>")
      .name("FaceRetouchingNaturalRound")
  }
}

export default FaceRetouchingNaturalRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
