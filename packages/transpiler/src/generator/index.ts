import {ParserEl} from "../parser/parserEl";
import {Generator} from "./generator";

export function resolveParserEl(parserEl: ParserEl, derivedArr: string[]) {
    return new Generator(derivedArr).generate(parserEl)
}