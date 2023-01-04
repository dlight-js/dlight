
function isFunc(str: string) {
    return /(^\(\)\s*?=>)|(function\s*?\(\))/.test(str.trim())
}

export function geneDeps(valueStr: string) {
    if (isFunc(valueStr.trim())) return "[]"
    const depReg = /(?:[^\w$]|^)this\.(\w+)(?:[^\w$]|$)/g
    const matches = valueStr.matchAll(depReg)
    const listenDeps = Array.from(matches).map(match=>match[1])

    return "[" + [...new Set(listenDeps)].map(v=>"\""+v+"\"").join(", ") + "]"
}

export function uid() {
    return Math.random().toString(20).slice(2)
}