import {ParserEl} from "../parser/parserEl";
import { uid } from "./utils";

function isEl(parserEl: ParserEl) {
    return !["If", "For", "TextNode"].includes(parserEl.tag)
}

export function isCustomEl(parserEl: ParserEl) {
    return parserEl.tag[0].toUpperCase() === parserEl.tag[0] && isEl(parserEl)
}

export function newLine(value: string) {
    return `\t\t${value}\n`
}

export function indent(value: string) {
    return "\t" + value
}

export function geneId(idAppendixNum: number) {
    if (idAppendixNum === 0) return `"${uid()}"`
    let id = `\`${uid()}`
    for (let i of [...Array(idAppendixNum).keys()]) {
        id += `_\${_$idx${i}}`
    }
    return id + "`"
}

export function geneAppendix(newAppendix: string, idAppendix?: string) {
    return idAppendix ? `${idAppendix}-${newAppendix}` : newAppendix
}

export function geneChildNodesArray(parserEl: ParserEl) {
    return "[" + parserEl.children.map((_, idx)=>`node${idx}`).join(", ") + "]"
}

export class BodyStringBuilder {
    value: string = ""

    indent() {
        this.value = "\t" + this.value.replace(/\n(?!$)/g, "\n\t")
        return this
    }
    
    add(value: string) {
        this.value += newLine(value)
    }

    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
}