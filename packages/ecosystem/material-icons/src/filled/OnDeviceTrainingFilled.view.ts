import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OnDeviceTrainingFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 16h2v1h-2zm1-5c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72v.78h2v-.78c.6-.35 1-.98 1-1.72 0-1.1-.9-2-2-2z\"/><path d=\"M18 1.01 6 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM18 18H6V6h12v12z\"/><path d=\"M16.01 15.95c.62-.83.99-1.84.99-2.95s-.37-2.12-.99-2.95l-1.07 1.07c.35.54.56 1.19.56 1.88s-.21 1.34-.56 1.88l1.07 1.07zm-6.95-1.07c-.35-.54-.56-1.19-.56-1.88 0-1.93 1.57-3.5 3.5-3.5v1.25l2.25-2-2.25-2V8c-2.76 0-5 2.24-5 5 0 1.11.37 2.12.99 2.95l1.07-1.07z\"/>")
      .name("OnDeviceTrainingFilled")
  }
}

export default OnDeviceTrainingFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
