import {parseDLightBody} from "./parser";
import {resolveParserEl} from "./generator";

export function reconstructBodyStr(str: string) {
    let parserEl = parseDLightBody(str)
    return resolveParserEl(parserEl)
}