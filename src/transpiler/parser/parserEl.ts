
export class ParserEl {
    tag: string = ""
    currKey: string = ""
    kv: any = {}
    children: ParserEl[] = []
    parent?: ParserEl
    depth: number
    id: string

    constructor(tag: string, depth: number, id: string) {
        this.tag = tag
        this.depth = depth
        this.id = id
    }

    get lastChild(): ParserEl {
        if (this.children.length === 0) return this
        return this.children[this.children.length - 1]
    }

    addChild(child: ParserEl) {
        this.children.push(child)
        child.parent = this
    }
}