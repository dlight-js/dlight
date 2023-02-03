declare class ParserNode {
    tag: string;
    kv: {
        [key: string]: any;
    };
    children: ParserNode[];
    parent?: ParserNode;
    constructor(tag: string);
    get lastChild(): ParserNode;
    addChild(child: ParserNode): void;
    addChildren(children: ParserNode[]): void;
}

interface DlightTranspilerConfig {
    bodyGetter: (fileCode: string) => {
        code: string;
        bodyMap: string;
    };
    bodyParser: (bodyStr: string) => ParserNode;
}

declare const _default$1: any;

declare const _default: any;

declare function geneParserNode(fileCode: string, dlightTranspilerConfig: DlightTranspilerConfig): string;

export { _default as JSDConfig, _default$1 as JSXConfig, geneParserNode };
