import { View } from "@dlightjs/dlight"
import Types, { Prop } from "@dlightjs/types"

interface CaseProps {
  _$content?: string
}

class Case extends View implements CaseProps {
  @Prop _$content = " default"
  iAmCase = true

  Body() {}
}

export default Types<CaseProps>(Case)
