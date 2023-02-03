import Transpiler from "./transpilerFuncs"


export default {
    transform: {
        ts: (code: string) => Transpiler.transform(code, {
            filename: "*.ts",
            presets: ["@babel/preset-typescript"]
        }).code
    },
    traverse: Transpiler.traverse,
    generate: (ast: any) => Transpiler.generator(ast).code,
    parse: {
        deco: (code: string) => Transpiler.parse(code, {
            filename: "*.ts",
            presets: ["@babel/preset-typescript"],
            plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
        }),
        ts: (code: string) => Transpiler.parse(code, {
            filename: "*.ts",
            presets: ["@babel/preset-typescript"]
        }),
        jsx: (code: string) => Transpiler.parse(code, {
            presets: ["@babel/preset-react"],
        }),
        all: (code: string) => Transpiler.parse(code, {
            filename: "*.jsx",
            presets: ["@babel/preset-react",  "@babel/preset-typescript"],
            plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
        })
    }
}
