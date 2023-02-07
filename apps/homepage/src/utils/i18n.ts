interface EnvProp {
    language: "en" | "zh"
}

export const Env: EnvProp = {
    language: "en"
}


const zhTranslateMap: any = {
    performance: "性能",
    Delightful: "开心",
    Light: "轻量"
}
export function i18n(strings: any, ...values: any) {
    let str = ""
    for (let i=0; i<strings.length; i++) {
        str += strings[i]
        str += values[i] ?? ""
    }
    if (Env.language === "en") {
        return str
    }
    if (Env.language === "zh") {
        return zhTranslateMap[str] ?? str
    }
}
