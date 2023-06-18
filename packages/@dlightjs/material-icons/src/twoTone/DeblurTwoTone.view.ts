import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DeblurTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"6\" cy=\"14\" r=\"1\"/><circle cx=\"6\" cy=\"18\" r=\"1\"/><circle cx=\"6\" cy=\"10\" r=\"1\"/><circle cx=\"3\" cy=\"10\" r=\".5\"/><circle cx=\"6\" cy=\"6\" r=\"1\"/><circle cx=\"3\" cy=\"14\" r=\".5\"/><circle cx=\"10\" cy=\"21\" r=\".5\"/><circle cx=\"10\" cy=\"3\" r=\".5\"/><circle cx=\"10\" cy=\"6\" r=\"1\"/><circle cx=\"10\" cy=\"14\" r=\"1.5\"/><circle cx=\"10\" cy=\"10\" r=\"1.5\"/><circle cx=\"10\" cy=\"18\" r=\"1\"/><path d=\"M12 3v2c3.86 0 7 3.14 7 7s-3.14 7-7 7v2c4.96 0 9-4.04 9-9s-4.04-9-9-9z\"/><path d=\"M12 5v14c3.86 0 7-3.14 7-7s-3.14-7-7-7z\" opacity=\".3\"/>")
      .name("DeblurTwoTone")
  }
}

export default DeblurTwoTone as any as Typed<DLightIconType>
