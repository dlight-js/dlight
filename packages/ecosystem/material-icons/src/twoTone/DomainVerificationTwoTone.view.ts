import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DomainVerificationTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 18h14V8H5v10zm3.82-6.42 2.12 2.12 4.24-4.24 1.41 1.41-5.66 5.66L7.4 13l1.42-1.42z\" opacity=\".3\"/><path d=\"m16.6 10.88-1.42-1.42-4.24 4.25-2.12-2.13L7.4 13l3.54 3.54z\"/><path d=\"M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zm0 14H5V8h14v10z\"/>")
      .name("DomainVerificationTwoTone")
  }
}

export default DomainVerificationTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
