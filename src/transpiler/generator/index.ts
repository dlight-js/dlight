import {ParserNode} from "../parserNode";
import {Generator} from "./generator";

export function resolveParserNode(parserNode: ParserNode, depChain: string[]) {
    return new Generator(depChain).generate(parserNode)
}