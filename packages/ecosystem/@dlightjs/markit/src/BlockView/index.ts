import { type PropWrapper, type Typed } from "@dlightjs/types"
import CheckList from "./CheckList.view"
import Divider from "./Divider.view"
import Heading from "./Heading.view"
import OrderedList from "./OrderedList.view"
import Paragraph from "./Paragraph.view"
import UnorderedList from "./UnorderedList.view"

const BlockRenderer: Record<string, Typed<PropWrapper<{ props: Object, _$content: any }>>> = {
  Paragraph,
  Heading,
  UnorderedList,
  OrderedList,
  // Table: Table as any as Typed<Table>,
  // Blockquote: Blockquote as any as Typed<Blockquote>,
  Divider,
  CheckList
  // Image: Image as any as Typed<Image>,
  // Footnote: Footnote as any as Typed<Footnote>,
} as any

export default BlockRenderer
