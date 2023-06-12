import { b } from "../dist"
import { type Typed, type Prop, S, RequiredProp } from "./index"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View = class {  }

type GG<T> = (T | string)
class MyView extends View {
  hh1: RequiredProp<GG<number>> = 1 as any
  hh2: Prop<string> = "" as any
  hh3: Prop<string> = "" as any
  hh4: Prop<string> = "" as any
  hh5: Prop<string> = "" as any
  hh6: Prop<string> = "" as any
  hh7: Prop<string> = "" as any
  hh8: Prop<string> = "" as any
  hh9: Prop<string> = "" as any
  hh10: Prop<string> = "" as any
  hh11: Prop<string> = "" as any
  hh12: Prop<string> = "" as any
  hh13: Prop<string> = "" as any
  hh14: Prop<string> = "" as any
  hh15: Prop<string> = "" as any
  hh16: Prop<string> = "" as any
  hh17: Prop<string> = "" as any
  hh18: Prop<string> = "" as any
  hh19: Prop<string> = "" as any
  hh20: Prop<string> = "" as any


  jj: string = 1

}

const SubViewWithTypes = MyView as any as Typed<MyView>

// type PropsKeys2<T> = FilterNever<{
//   [K in keyof T]: T[K] extends RequiredProp<infer U>
//     ? U
//     : T[K] extends Prop<infer M>
//       ? M
//       : never
// }> & OptionalUseless



// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView {
  Body() {
    SubViewWithTypes()
      .
  }
}
