import { Types, type Prop } from "./customTag"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View = undefined as any

class MyView {
  option1: Prop<number>
  option2?: Prop<string>
  option3?: Prop<any>
  option4: Prop<any>
  other: any

  tt: string
  Body() {}
}
const SubViewWithTypes = Types(MyView)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView extends View {
  Body() {
    SubViewWithTypes()
  }
}


type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

type ReplaceAnyWithUnknown<T> = {
  [K in keyof T]: IfAny<T[K], never, T[K]>;
};

type Prop<T> = {
  value: T;
};

type A = {a: any, b: Prop<any>};

type AWithUnknown = ReplaceAnyWithUnknown<A>;