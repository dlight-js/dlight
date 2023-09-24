import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AodRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 18H7V6h10v12zm-8.25-8h6.5c.41 0 .75.34.75.75s-.34.75-.75.75h-6.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75zm1 3h4.5c.41 0 .75.34.75.75s-.34.75-.75.75h-4.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75z\"/>")
      .name("AodRound")
  }
}

export default AodRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
