import {ParserNode} from "../parserNode";

export function isHTMLTag(parserNode: ParserNode) {
    const tag = parserNode.tag
    return /^[a-z][a-z0-9]*$/.test(tag) || tag.startsWith("_")
}


export function newLine(value: string) {
    return `${value}\n`
}


export function geneChildNodesArray(parserNode: ParserNode) {
    return "[" + parserNode.children.map((_: any, idx: number)=>`_$node${idx}`).join(", ") + "]"
}

export class BodyStringBuilder {
    value: string = ""
    
    add(value: string) {
        this.value += newLine(value)
    }

    shift(value: string) {
        this.value = newLine(value) + this.value
    }

    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
    
}