import * as t from "@babel/types";
// @ts-ignore
import babel from "@babel/core"
const parse = babel.parse

export function functionBlockStatement(code: string) {
    return parse(code).program.body[0] as t.FunctionDeclaration
}
