import {ParserEl} from "../parser/parserEl";
import {Generator} from "./generator";

export function resolveParserEl(parserEl: ParserEl) {
    return Generator.generate(parserEl)
}