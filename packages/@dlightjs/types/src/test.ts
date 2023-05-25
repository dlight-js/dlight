import { Types } from "./customTag"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View = undefined as any

interface SubViewProps {
  /**
     * @ok this will show
     */
  hh: string
  option1?: number
  option2?: string
}

// @ts-expect-error
class SubView extends View implements SubViewProps {
  Body() {}
}
const SubViewWithTypes = Types<SubViewProps>(SubView)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView extends View {
  Body() {
    SubViewWithTypes()
    _("jfa")
  }
}
