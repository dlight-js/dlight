function isFunc(str: string) {
    return /(^\(*\w*?\)*\s*?=>)|(function\s*?\(.*?\))/.test(str.trim())
}

export function geneDepsStr(listenDeps: string[]) {
    return "[" + listenDeps.map(v=>"\""+v+"\"").join(", ") + "]"
}

export function uid() {
    return Math.random().toString(20).slice(2)
}

export function geneDepsAllowFunc(valueStr: string) {
    // ---- 后续可能用支持in browser的recast，https://github.com/benjamn/recast
    //      目前就字符串匹配 this.xxx  ([^\w$]|^)this.xxx([^\w$]|$)
    const depReg = /(?:[^\w$]|^)this\.(\w+)(?:[^\w$]|$)/g
    const matches = valueStr.matchAll(depReg)
    const listenDeps = Array.from(matches).map(match=>match[1])

    return [...new Set(listenDeps)]
}

export function geneDeps(valueStr: string) {
    if (isFunc(valueStr.trim())) return []
    return geneDepsAllowFunc(valueStr)
}