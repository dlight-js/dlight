import { type View } from "@dlightjs/dlight"
import { type ContentProp, type Typed } from "@dlightjs/types"
import Bold from "./Bold.view"
import Code from "./Code.view"
import Highlight from "./Highlight.view"
import Italic from "./Italic.view"
import Link from "./Link.view"
import Strike from "./Strike.view"
import Subscript from "./Subscript.view"
import Superscript from "./Superscript.view"
import Underline from "./Underline.view"
import Text from "./Text.view"
import FootnoteSup from "./FootnoteSup.view"
import { addInlineRule as addMarkitInlineRule } from "@iandx/markit"

const InlineRendererBase: Record<string, Typed<{ props: Object, ast: ContentProp<string> }>> = {
  Text,
  Bold,
  Italic,
  Strike,
  Code,
  Link,
  Underline,
  Highlight,
  Superscript,
  Subscript,
  FootnoteSup
} as any

export const InlineRenderer = new Proxy(InlineRendererBase, {
  get(target, key) {
    return (target as any)[key] ?? target.Text
  }
})

interface InlineRuleType {
  name: string
  rule: any
  view: (new (...args: any[]) => any & typeof View) | Function
}

export const addInlineRule = ({ name, rule, view }: InlineRuleType) => {
  addMarkitInlineRule([{ name, rule }])
  InlineRenderer[name] = view as any
}

export default InlineRenderer
