import { parseDlightFile } from "./babel"
import { ParserNode } from "./ParserNode"
import { DlightTranspilerConfig } from "./type"
import {changeTranspilerType} from "./transpilerFuncs";

export function geneParserNode(fileCode: string, dlightTranspilerConfig: DlightTranspilerConfig, transpilerType: "babel" = "babel") {
    changeTranspilerType(transpilerType)
    // changeBabelType("standalone")
    const {bodyGetter, bodyParser} = dlightTranspilerConfig
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

import JSXConfig from "./jsx"
import JSDConfig from "./jsd"

export {JSXConfig, JSDConfig}
