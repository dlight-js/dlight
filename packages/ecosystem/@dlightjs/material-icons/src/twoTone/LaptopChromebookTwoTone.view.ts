import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LaptopChromebookTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 5h16v10H4z\" opacity=\".3\"/><path d=\"M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z\"/>")
      .name("LaptopChromebookTwoTone")
  }
}

export default LaptopChromebookTwoTone as any as Typed<DLightIconType>
