
export class ParserEl {
    tag: string = ""
    currKey: string = ""
    kv: {[key: string]: any} = {
        props: [],
        dotProps: []
    }
    children: ParserEl[] = []
    parent?: ParserEl

    constructor(tag: string) {
        this.tag = tag
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