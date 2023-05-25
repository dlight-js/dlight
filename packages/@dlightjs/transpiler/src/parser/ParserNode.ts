export interface ParserNode {
  tag: string
  attr: Record<string, any>
  children: ParserNode[]
}
