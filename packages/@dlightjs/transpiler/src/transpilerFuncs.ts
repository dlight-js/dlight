// @ts-ignore
import * as Babel from "@babel/core"
// @ts-ignore
import generator from "@babel/generator"

const babelFuncs = {
    transform: Babel.transform,
    traverse: Babel.traverse,
    parse: Babel.parse,
    generator: generator,
}

const funcs = {...babelFuncs}

export function changeTranspilerType(type: "babel") {
    let targetFuncs: any
    if (type === "babel") {
        targetFuncs = babelFuncs
    }
    funcs.transform = targetFuncs.transform
    funcs.traverse = targetFuncs.traverse
    funcs.parse = targetFuncs.parse
    funcs.generator = targetFuncs.generator
}

export default funcs