import { parseDlightFile } from "./babel"
import { ParserNode } from "./ParserNode"
import { DlightTranpilerConfig } from "./type"



export function geneParserNode(fileCode: string, dlightTranpilerConfig: DlightTranpilerConfig) {
    const {bodyGetter, bodyParser} = dlightTranpilerConfig
    // ---- 首先把body换成一个id的string，并拿到bodyMap
    const {code, bodyMap} = bodyGetter(fileCode)
    // ---- 再把bodyMap放到bodyParser，拿到一个个ParserNode
    const parserNodeBodyMap: {[key: string]: ParserNode} = {}
    for (let [id, bodyStr] of Object.entries(bodyMap)) {
        parserNodeBodyMap[id] = bodyParser(bodyStr)
    }
    // ---- 再把新map和替换了的code放到babel解析整个文件
    return parseDlightFile(code, parserNodeBodyMap)
}