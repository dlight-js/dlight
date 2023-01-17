import { ParserNode } from "./ParserNode"


export interface DlightTranpilerConfig {
    bodyGetter: (fileCode: string) => {code: string, bodyMap: string},
    bodyParser: (bodyStr: string) => ParserNode
}
