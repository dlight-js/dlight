import { Types } from "./customTag"
import { area, div, img } from "./htmlTag"

const View = undefined as any

const _ = document.getElementById("j")

interface SubViewProps {
  /**
     * @ok this will show
     */
  hh: string
  option1?: number
  option2?: string
}

class SubView extends View implements SubViewProps {
  Body() {}
}
const SubViewWithTypes = Types<SubViewProps>(SubView)

class TypeTestView extends View {
  Body() {
    SubViewWithTypes()
      
}


