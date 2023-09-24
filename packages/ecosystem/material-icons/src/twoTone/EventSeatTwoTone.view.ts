import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EventSeatTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 5h6v7H9z\" opacity=\".3\"/><path d=\"M4 21h2v-4h12v4h2v-6H4zM17 5c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v9h10V5zm-2 7H9V5h6v7zm4-2h3v3h-3zM2 10h3v3H2z\"/>")
      .name("EventSeatTwoTone")
  }
}

export default EventSeatTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
