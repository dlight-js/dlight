import { type Typed, type PropWrapper } from "@dlightjs/types"
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

const InlineRenderer: Record<string, Typed<PropWrapper<{ props: Object, _$content: string }>>> = {
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

export default InlineRenderer
