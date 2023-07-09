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

const BlockRenderer: Record<string, Typed<PropWrapper<{ props: Object, _$content: any }>>> = {
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

export default BlockRenderer
