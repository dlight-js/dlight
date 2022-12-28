import {ParserEl} from "../parser/parserEl";
import {Generator} from "./generator";

export function resolveParserEl(parserEl: ParserEl) {
    const generator = new Generator()
    generator.generate(parserEl)
    return generator.body
}