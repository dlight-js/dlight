export interface ParserNode {
    tag: string
    attr: {[key: string]: any}
    children: ParserNode[]
}
