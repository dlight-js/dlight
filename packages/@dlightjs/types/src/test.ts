import { b } from "../dist"
import { Typed, type Prop } from "./index"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View: any = class { t: Prop<string> }

type GG<T> = (T | string)
class MyView extends View {
  option1: Prop<GG<number>> = 1 as any
  hh2: Prop<string> = "" as any
  hh3: Prop<string> = "" as any
}

const SubViewWithTypes = MyView as any as Typed<MyView>

type JJ = Typed<MyView>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView  {
  Body() {
    SubViewWithTypes().
  }
}


