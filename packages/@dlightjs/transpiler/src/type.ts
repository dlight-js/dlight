import { ParserNode } from "./ParserNode"


export interface DlightTranspilerConfig {
    bodyGetter: (fileCode: string) => {code: string, bodyMap: string},
    bodyParser: (bodyStr: string) => ParserNode
}
