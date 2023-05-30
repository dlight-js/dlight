import { Types, type Prop } from "./customTag"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View = undefined as any

class MyView {
  hh: Prop<string>
  option1: Prop<number>
  option2?: Prop<string>
  option3?: Prop<any>
  other: any

  tt: string
  Body() {}
}
const SubViewWithTypes = Types(MyView)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView extends View {
  Body() {
    SubViewWithTypes()
      .hh("jj").option1("kkk").option2("jjj").option3('afa')
  }
}
