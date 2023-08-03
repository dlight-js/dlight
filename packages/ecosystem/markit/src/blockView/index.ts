import { type View } from "@dlightjs/dlight"
import { type PropWrapper, type Typed } from "@dlightjs/types"
import Blockquote from "./Blockquote.view"
import CheckList from "./CheckList.view"
import Divider from "./Divider.view"
import Heading from "./Heading.view"
import OrderedList from "./OrderedList.view"
import Paragraph from "./Paragraph.view"
import Table from "./Table.view"
import UnorderedList from "./UnorderedList.view"
import Image from "./Image.view"
import Footnote from "./Footnote.view"
import CodeBlock from "./CodeBlock.view"
import { addBlockRule as addMarkitBlockRule } from "@iandx/markit"

const BlockRendererBase: Record<string, Typed<PropWrapper<{ props: Object, _$content: any }>>> = {
  Paragraph,
  Heading,
  UnorderedList,
  OrderedList,
  Table,
  Blockquote,
  Divider,
  CheckList,
  Image,
  Footnote,
  CodeBlock
} as any

export const BlockRenderer = new Proxy(BlockRendererBase, {
  get(target, key) {
    return (target as any)[key] ?? target.Paragraph
  }
})

interface BlockRuleType {
  name: string
  rule?: any
  view: new (...args: any[]) => any & typeof View
}

export const addBlockRule = ({ name, rule, view }: BlockRuleType) => {
  addMarkitBlockRule({ name, rule })
  BlockRenderer[name] = view as any
}

export default BlockRenderer
