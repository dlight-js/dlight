import {DlightParser} from "./parser";

export function parseDLightBody(code: string) {
    const parser = new DlightParser(code)
    parser.parse()
    return parser.parserEl
}