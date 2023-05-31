import { b } from "../dist"
import { Types, type Prop } from "./customTag"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { a, area, div, img } from "./htmlTag"

const View: new () => {} = class { t: Prop<string> }

const required = null as any
type RequiredProp<T> = T & { _$isProp: true, _$required: true } 

const hh: RequiredProp<string> = required 
type C = typeof hh extends { _$required: true } ? "jj" : never
class MyView {
  /** @test-jsdoc */
  option1: Prop<number> = 1 as any
  hh: RequiredProp<number> = required
  hh2?: Prop<string>
  hh3?: Prop<string>
  hh4?: string
  aef: any
  faef: string
  b = this.option1++
}
type FilterNever<T> = Omit<
T,
{ [K in keyof T]: T[K] extends (never | undefined) ? K : never }[keyof T]
>
type RequiredPart<T> = FilterNever<{
  [K in keyof T]: T[K] extends RequiredProp<infer U> ? Prop<U> : never
}>

type OptionalPart<T> = FilterNever<{
  [K in keyof T]?: T[K] extends RequiredProp<infer _> ? never : T[K]
}>

type Together<T> = OptionalPart<T> & RequiredPart<T>

const SubViewWithTypes = Types(MyView)

class SubViewClass extends View {
  option1: Prop<number> = 1
  option2?: Prop<number> = 1
}
const SubView = Types(SubViewClass)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestView extends View {
  Body() {
    SubViewWithTypes().
  }
}
