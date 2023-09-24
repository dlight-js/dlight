import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LoyaltyOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z\"/><circle cx=\"6.5\" cy=\"6.5\" r=\"1.5\"/><path d=\"M8.9 12.55c0 .57.23 1.07.6 1.45l3.5 3.5 3.5-3.5a2.053 2.053 0 0 0-2.9-2.9l-.6.6-.6-.59c-.37-.38-.89-.61-1.45-.61-1.13 0-2.05.92-2.05 2.05z\"/>")
      .name("LoyaltyOutlined")
  }
}

export default LoyaltyOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
