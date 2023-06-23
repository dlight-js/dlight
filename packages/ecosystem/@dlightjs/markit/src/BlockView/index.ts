import { type PropWrapper, type Typed } from "@dlightjs/types"
import Divider from "./Divider.view"
import Heading from "./Heading.view"
import Paragraph from "./Paragraph.view"
import UnorderedList from "./UnorderedList.view"

const BlockRenderer: Record<string, Typed<PropWrapper<{ props: Object, _$content: any }>>> = {
  Paragraph,
  Heading,
  UnorderedList,
  // OrderedList: OrderedList as any as Typed<OrderedList>,
  // Table: Table as any as Typed<Table>,
  // Blockquote: Blockquote as any as Typed<Blockquote>,
  Divider
  // CheckList: CheckList as any as Typed<CheckList>,
  // Image: Image as any as Typed<Image>,
  // Footnote: Footnote as any as Typed<Footnote>,
} as any

export default BlockRenderer
