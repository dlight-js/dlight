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

function Prop(target: any, key: string) {
}
class SubView extends View implements SubViewProps {
  @Prop hh: string
  @Prop option1: number
  @Prop option2: string

  Body() { }
}
class DLight {
  count = 1
  okCount = this.count + 1
  fineCount = this.okCount + 1
  @Prop hh = { a: 1 }
}

type PropsKeys<T> = {
  [K in keyof T]: Extract<T[K], { a: 1 }>
};

type DLightPropTypes = PropsKeys<DLight>;


// type DLightProps = Partial<Props<DLight>>
const g: DLightPropTypes = 1 as any


const SubViewWithTypes = Types<SubViewProps>(SubView)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView extends View {
  Body() {
    SubViewWithTypes()
    _("jfa")
  }
}
