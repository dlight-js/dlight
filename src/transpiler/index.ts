import {parseDLightBody} from "./parser";
import {resolveParserEl} from "./generator";

export function reconstructBodyStr(str: string) {
    let parserEl = parseDLightBody(str)
    console.log(parserEl, 'parserEl')
    return resolveParserEl(parserEl)
}

function transpileBodyCode(code: string): [string, boolean] {
    const bodyMatchRegStr = '(class\\s+?.+?\\s+?extends\\s+DLBase\\s*?{(?:.*?\\n)*?\\s*?Body\\s*?=\\s*?)```([\\s\\S]*?)```'
    const bodyMatchRegG = new RegExp(bodyMatchRegStr, "g")
    const bodyMatchReg = new RegExp(bodyMatchRegStr)
    let flag = false

    const replaceFunc = (str: string) => {
        const matched = str.match(bodyMatchReg)!
        const prefix = matched[1]
        const bodyStr = matched[2]
        const alteredBodyStr = reconstructBodyStr(bodyStr)

        flag = true
        return prefix.trim() + " () => {\n" + alteredBodyStr + "\t}"
    }

    return [code.replace(bodyMatchRegG, replaceFunc), flag]
}

function transpileDerived(code: string) {
    return code.replaceAll(/(@Derived [\w$]+?\s*)=(\s*.+)/g, "$1= () =>$2")
}

export function transpileDLightTsCode(code: string) {
    let [alteredCode, flag] = transpileBodyCode(code)
    alteredCode = transpileDerived(alteredCode)
    alteredCode = `import * as _$ from "./core/func";\n` + alteredCode

    return flag ? alteredCode: code
}