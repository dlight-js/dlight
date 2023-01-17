
export class ParserNode {
    tag: string = ""
    kv: {[key: string]: any} = {
        props: [],
        dotProps: []
    }
    children: ParserNode[] = []
    parent?: ParserNode

    constructor(tag: string) {
        this.tag = tag
    }

    get lastChild(): ParserNode {
        if (this.children.length === 0) return this
        return this.children[this.children.length - 1]
    }

    addChild(child: ParserNode) {
        this.children.push(child)
        child.parent = this
    }

    addChildren(children: ParserNode[]) {
        for (let child of children) {
            this.addChild(child)
        }
    }
}