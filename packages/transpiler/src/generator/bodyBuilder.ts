import {ParserNode} from "../parserNode";
import { uid } from "./utils";

function isEl(parserNode: ParserNode) {
    return !["If", "For", "TextNode"].includes(parserNode.tag)
}

export function isCustomEl(parserNode: ParserNode) {
    return parserNode.tag[0].toUpperCase() === parserNode.tag[0] && isEl(parserNode)
}

export function newLine(value: string) {
    return `${value}\n`
}

export function geneId(idAppendixNum: number, appendix: string) {
    if (idAppendixNum === -1) return ""
    if (idAppendixNum === 0) return `\`${uid()}_\${this._$id}${appendix===""?"":"_"+appendix}\``
    let id = `\`${uid()}_\${this._$id}`
    for (let i of [...Array(idAppendixNum).keys()]) {
        id += `_\${_$idx${i}}`
    }
    return id + "_" + appendix + "`"
}

export function geneAppendix(newAppendix: string, idAppendix?: string) {
    return idAppendix ? `${idAppendix}-${newAppendix}` : newAppendix
}

export function geneChildNodesArray(parserNode: ParserNode) {
    return "[" + parserNode.children.map((_: any, idx: number)=>`node${idx}`).join(", ") + "]"
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