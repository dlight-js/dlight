import * as Nodes from "../Nodes"

export default {
  ...Nodes,
  c: Nodes.CustomNode,
  t: Nodes.TextNode,
  h: Nodes.HtmlNode,
  i: Nodes.IfNode,
  f: Nodes.ForNode,
  e: Nodes.ExpressionNode,
  v: Nodes.EnvNode
}
