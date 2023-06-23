import { type Typed, type Prop, S, type RequiredProp, div, svg, DLightHTMLAttributes, PropWrapper, PartialPropWrapper } from "./index"
import { _ } from "./expressionTag"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { a, area, div, img } from "./htmlTag"

const View = class { }


type GG<T> = (T | string)

/**
 * @content kk
 */
class MyView extends View {
/**
   * @prop aejfaoie
   */
  hh1: RequiredProp<GG<number>> = 1 as any
  /**
   * @okkkfja aejfaoie
   */
  _$content: Prop<string> = "" as any
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

/** @inner */
interface AA {
  /**
   * good
   */
  ok: string
}

type t = {
  /**
   * typeof 
   */
  ok: AA["ok"]
}

let T: t
T.ok

type NNN<T> = T["_$content"] extends RequiredProp<infer U>
  ? "jj"
  : T["_$content"] extends Prop<infer U>
    ? "hh"
    : "no"

type JJA = NNN<MyView>

const SubViewWithTypes = MyView as any as Typed<MyView>

SubViewWithTypes().forwardProps()



/**
 * A simple function that adds two numbers.
 * @param {number} a - The first number to add.
 * @param {number} b - The second number to add.
 * @returns {number} The sum of the two input numbers.
 */
function add(a, b) {
  return a + b
}

/** @inheritdoc */
type jj<T> = T

/** @inheritdoc */
const b = add as any as jj<typeof add>

svg()



/**
 * hhfaef
 */
class LL {

}

const JJ = LL


type a = undefined | ""

type b = a extends undefined | infer _ ? "hh" : "ahha"
type TTT = PartialPropWrapper<DLightHTMLAttributes<HTMLSpanElement, {}>>

const j: Typed<TTT>
const mmm: TTT

j().

const pic: DLightHTMLAttributes<Required<HTMLSpanElement>, {}>

pic.ariaAutoComplete

const jic: DLightHTMLAttributes<HTMLSpanElement, {}>
jic.ariaAutoComplete