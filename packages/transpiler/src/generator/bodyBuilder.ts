import {ParserEl} from "../parser/parserEl";

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

export function elId(parserEl: ParserEl) {
    return '$'+parserEl.id
}

export function geneChildElArray(parserEl: ParserEl) {
    return "[" + parserEl.children.map(el=>"el"+elId(el)).join(", ") + "]"
}

export class BodyStringBuilder {
    value: string = ""

    indent() {
        this.value = "\t" + this.value.replaceAll(/\n(?!$)/g, "\n\t")
        return this
    }
    
    add(value: string) {
        this.value += newLine(value)
    }
    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
}