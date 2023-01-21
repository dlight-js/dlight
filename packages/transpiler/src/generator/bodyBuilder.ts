import {ParserNode} from "../parserNode";

function isEl(parserNode: ParserNode) {
    return !["If", "For", "TextNode"].includes(parserNode.tag)
}

export function isCustomEl(parserNode: ParserNode) {
    return parserNode.tag[0].toUpperCase() === parserNode.tag[0] && isEl(parserNode)
}

export function newLine(value: string) {
    return `${value}\n`
}

export function geneAppendix(newAppendix: string, idAppendix?: string) {
    return idAppendix ? `${idAppendix}-${newAppendix}` : newAppendix
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