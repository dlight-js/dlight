import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class QueueMusicTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"16\" cy=\"17\" r=\"1\" opacity=\".3\"/><path d=\"M3 10h12v2H3v-2zm0 4h8v2H3v-2zm0-8h12v2H3V6zm14 8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5v8.18z\"/>")
      .name("QueueMusicTwoTone")
  }
}

export default QueueMusicTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
