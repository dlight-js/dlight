import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BluetoothDisabledOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13 5.83 1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2v-3.2zM5.41 4 4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59 5.41 4zM13 18.17v-3.76l1.88 1.88L13 18.17z\"/>")
      .name("BluetoothDisabledOutlined")
  }
}

export default BluetoothDisabledOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
