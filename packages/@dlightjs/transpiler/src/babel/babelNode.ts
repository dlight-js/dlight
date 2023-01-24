import * as t from "@babel/types";


export function createGetterSetter(
    name: string,
    getterBody: t.BlockStatement,
    setterBody: t.BlockStatement
) {

    return [
        t.classMethod("get", t.identifier(name), [], getterBody),
        t.classMethod("set", t.identifier(name), [t.identifier("value")], setterBody)
    ]
}

export function valueWithArrowFunc(node: any) {
    const originValue = node.value
    node.value = {
        type: "ArrowFunctionExpression",
        params: [],
        body: originValue as any
    } as any
}

