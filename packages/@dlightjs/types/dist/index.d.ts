import { HtmlNode, DLNode } from '@dlightjs/dlight';
import { Properties } from 'csstype';

type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
type RemoveReadOnly<T> = Pick<T, WritableKeysOf<T>>;
type OmitFunction<T> = Omit<T, {
    [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T]>;
type OmitFuncAndReadOnly<T> = RemoveReadOnly<OmitFunction<T>>;
type OmitFuncAndReadOnlyProperty<G = HTMLElement> = OmitFuncAndReadOnly<G>;
type DLightPropertyWrapper<T, G> = {
    [K in keyof OmitFuncAndReadOnlyProperty<G>]: (value: OmitFuncAndReadOnlyProperty<G>[K]) => T;
};
type PropertiesRequired = Required<Properties>;
type DLightShortcutStyle<T> = {
    [K in keyof PropertiesRequired as `_${string & K}`]: (value: PropertiesRequired[K]) => T;
};
type DLightHTMLElement<T, G = Record<string, undefined>> = DLightPropertyWrapper<T, G> & DLightShortcutStyle<T>;

interface DLightHtmlAreaSpecific extends DLightHtmlTag<DLightHtmlAreaSpecific, DLightHTMLElement<DLightHtmlAreaSpecific, HTMLAreaElement>> {
}
interface DLightHtmlAudioSpecific extends DLightHtmlTag<DLightHtmlAudioSpecific, DLightHTMLElement<DLightHtmlAudioSpecific, HTMLAudioElement>> {
}
interface DLightHtmlDivSpecific extends DLightHtmlTag<DLightHtmlDivSpecific, DLightHTMLElement<DLightHtmlDivSpecific, HTMLDivElement>> {
}
interface DLightHtmlImageSpecific extends DLightHtmlTag<DLightHtmlImageSpecific, DLightHTMLElement<DLightHtmlImageSpecific, HTMLImageElement>> {
}
interface DLightHtmlBaseSpecific extends DLightHtmlTag<DLightHtmlBaseSpecific, DLightHTMLElement<DLightHtmlBaseSpecific, HTMLBaseElement>> {
}
interface DLightHtmlBodySpecific extends DLightHtmlTag<DLightHtmlBodySpecific, DLightHTMLElement<DLightHtmlBodySpecific, HTMLBodyElement>> {
}
interface DLightHtmlBRSpecific extends DLightHtmlTag<DLightHtmlBRSpecific, DLightHTMLElement<DLightHtmlBRSpecific, HTMLBRElement>> {
}
interface DLightHtmlButtonSpecific extends DLightHtmlTag<DLightHtmlButtonSpecific, DLightHTMLElement<DLightHtmlButtonSpecific, HTMLButtonElement>> {
}
interface DLightHtmlCanvasSpecific extends DLightHtmlTag<DLightHtmlCanvasSpecific, DLightHTMLElement<DLightHtmlCanvasSpecific, HTMLCanvasElement>> {
}
interface DLightHtmlInputSpecific extends DLightHtmlTag<DLightHtmlInputSpecific, DLightHTMLElement<DLightHtmlInputSpecific, HTMLInputElement>> {
}
interface DLightHtmlSpanSpecific extends DLightHtmlTag<DLightHtmlSpanSpecific, DLightHTMLElement<DLightHtmlSpanSpecific, HTMLSpanElement>> {
}
interface DLightHtmlTableSpecific extends DLightHtmlTag<DLightHtmlTableSpecific, DLightHTMLElement<DLightHtmlTableSpecific, HTMLTableElement>> {
}
interface DLightHtmlTextAreaSpecific extends DLightHtmlTag<DLightHtmlTextAreaSpecific, DLightHTMLElement<DLightHtmlTextAreaSpecific, HTMLTextAreaElement>> {
}
interface DLightHtmlSelectSpecific extends DLightHtmlTag<DLightHtmlSelectSpecific, DLightHTMLElement<DLightHtmlSelectSpecific, HTMLSelectElement>> {
}

type HtmlLifecycleFuncType<T> = (func: (el?: HTMLElement, node?: HtmlNode) => void) => T;
interface DLightHtmlHook<T> {
    element: (holderOrFunc: HTMLElement | ((holder: HTMLElement) => void)) => T;
    willAppear: HtmlLifecycleFuncType<T>;
    didAppear: HtmlLifecycleFuncType<T>;
    willDisappear: HtmlLifecycleFuncType<T>;
    didDisappear: HtmlLifecycleFuncType<T>;
}
type DLightHtmlTag<T, G = DLightHTMLElement<T>> = G & DLightHtmlHook<T>;
interface DLightHtmlTagSpecific extends DLightHtmlTag<DLightHtmlTagSpecific> {
}
type DLightHtmlTagFunc<T = DLightHtmlTagSpecific> = (innerText?: string | number) => T;
declare const a: DLightHtmlTagFunc;
declare const abbr: DLightHtmlTagFunc;
declare const address: DLightHtmlTagFunc;
declare const area: DLightHtmlTagFunc<DLightHtmlAreaSpecific>;
declare const article: DLightHtmlTagFunc;
declare const aside: DLightHtmlTagFunc;
declare const audio: DLightHtmlTagFunc<DLightHtmlAudioSpecific>;
declare const b: DLightHtmlTagFunc;
declare const base: DLightHtmlTagFunc<DLightHtmlBaseSpecific>;
declare const bdi: DLightHtmlTagFunc;
declare const bdo: DLightHtmlTagFunc;
declare const blockquote: DLightHtmlTagFunc;
declare const body: DLightHtmlTagFunc<DLightHtmlBodySpecific>;
declare const br: DLightHtmlTagFunc<DLightHtmlBRSpecific>;
declare const button: DLightHtmlTagFunc<DLightHtmlButtonSpecific>;
declare const canvas: DLightHtmlTagFunc<DLightHtmlCanvasSpecific>;
declare const caption: DLightHtmlTagFunc;
declare const cite: DLightHtmlTagFunc;
declare const code: DLightHtmlTagFunc;
declare const col: DLightHtmlTagFunc;
declare const colgroup: DLightHtmlTagFunc;
declare const data: DLightHtmlTagFunc;
declare const datalist: DLightHtmlTagFunc;
declare const dd: DLightHtmlTagFunc;
declare const del: DLightHtmlTagFunc;
declare const details: DLightHtmlTagFunc;
declare const dfn: DLightHtmlTagFunc;
declare const dialog: DLightHtmlTagFunc;
declare const div: DLightHtmlTagFunc<DLightHtmlDivSpecific>;
declare const dl: DLightHtmlTagFunc;
declare const dt: DLightHtmlTagFunc;
declare const em: DLightHtmlTagFunc;
declare const embed: DLightHtmlTagFunc;
declare const fieldset: DLightHtmlTagFunc;
declare const figcaption: DLightHtmlTagFunc;
declare const figure: DLightHtmlTagFunc;
declare const footer: DLightHtmlTagFunc;
declare const form: DLightHtmlTagFunc;
declare const h1: DLightHtmlTagFunc;
declare const h2: DLightHtmlTagFunc;
declare const h3: DLightHtmlTagFunc;
declare const h4: DLightHtmlTagFunc;
declare const h5: DLightHtmlTagFunc;
declare const h6: DLightHtmlTagFunc;
declare const head: DLightHtmlTagFunc;
declare const header: DLightHtmlTagFunc;
declare const hgroup: DLightHtmlTagFunc;
declare const hr: DLightHtmlTagFunc;
declare const html: DLightHtmlTagFunc;
declare const i: DLightHtmlTagFunc;
declare const iframe: DLightHtmlTagFunc;
declare const img: DLightHtmlTagFunc<DLightHtmlImageSpecific>;
declare const input: DLightHtmlTagFunc<DLightHtmlInputSpecific>;
declare const ins: DLightHtmlTagFunc;
declare const kbd: DLightHtmlTagFunc;
declare const label: DLightHtmlTagFunc;
declare const legend: DLightHtmlTagFunc;
declare const li: DLightHtmlTagFunc;
declare const link: DLightHtmlTagFunc;
declare const main: DLightHtmlTagFunc;
declare const map: DLightHtmlTagFunc;
declare const mark: DLightHtmlTagFunc;
declare const menu: DLightHtmlTagFunc;
declare const meta: DLightHtmlTagFunc;
declare const meter: DLightHtmlTagFunc;
declare const nav: DLightHtmlTagFunc;
declare const noscript: DLightHtmlTagFunc;
declare const object: DLightHtmlTagFunc;
declare const ol: DLightHtmlTagFunc;
declare const optgroup: DLightHtmlTagFunc;
declare const option: DLightHtmlTagFunc;
declare const output: DLightHtmlTagFunc;
declare const p: DLightHtmlTagFunc;
declare const param: DLightHtmlTagFunc;
declare const picture: DLightHtmlTagFunc;
declare const pre: DLightHtmlTagFunc;
declare const progress: DLightHtmlTagFunc;
declare const q: DLightHtmlTagFunc;
declare const rp: DLightHtmlTagFunc;
declare const rt: DLightHtmlTagFunc;
declare const ruby: DLightHtmlTagFunc;
declare const s: DLightHtmlTagFunc;
declare const samp: DLightHtmlTagFunc;
declare const script: DLightHtmlTagFunc;
declare const section: DLightHtmlTagFunc;
declare const select: DLightHtmlTagFunc<DLightHtmlSelectSpecific>;
declare const slot: DLightHtmlTagFunc;
declare const small: DLightHtmlTagFunc;
declare const source: DLightHtmlTagFunc;
declare const span: DLightHtmlTagFunc<DLightHtmlSpanSpecific>;
declare const strong: DLightHtmlTagFunc;
declare const style: DLightHtmlTagFunc;
declare const sub: DLightHtmlTagFunc;
declare const summary: DLightHtmlTagFunc;
declare const sup: DLightHtmlTagFunc;
declare const table: DLightHtmlTagFunc<DLightHtmlTableSpecific>;
declare const tbody: DLightHtmlTagFunc;
declare const td: DLightHtmlTagFunc;
declare const template: DLightHtmlTagFunc;
declare const textarea: DLightHtmlTagFunc<DLightHtmlTextAreaSpecific>;
declare const tfoot: DLightHtmlTagFunc;
declare const th: DLightHtmlTagFunc;
declare const thead: DLightHtmlTagFunc;
declare const time: DLightHtmlTagFunc;
declare const title: DLightHtmlTagFunc;
declare const tr: DLightHtmlTagFunc;
declare const track: DLightHtmlTagFunc;
declare const u: DLightHtmlTagFunc;
declare const ul: DLightHtmlTagFunc;
declare const video: DLightHtmlTagFunc;
declare const wbr: DLightHtmlTagFunc;

interface ExpressionTag extends DLightHtmlTag<ExpressionTag> {
    onUpdateNodes: (func: (prevNodes: DLNode[], nodes: DLNode[]) => void) => ExpressionTag;
}
declare const _: (expression: string | number | DLNode | DLNode[]) => ExpressionTag;

type IsOptionalProp<T> = undefined extends T ? true : false;
type HasOnlyOptionalProps<T> = keyof T extends infer K ? K extends keyof T ? IsOptionalProp<T[K]> extends true ? HasOnlyOptionalProps<Omit<T, K>> : false : true : true;
type RemoveOptionalProps<T, K extends keyof T> = HasOnlyOptionalProps<Omit<T, K>> extends true ? Required<Omit<T, K>> : Omit<T, K>;
type DLightObject<T> = {
    [K in keyof T]: (value: T[K]) => DLightObject<RemoveOptionalProps<T, K>>;
};
type CustomTag<T> = "_$content" extends keyof T ? (_$content?: T["_$content"]) => DLightObject<T> : () => DLightObject<T>;
declare function Types<T = any>(cls: any): CustomTag<T>;

declare const State: any;
declare const PropState: any;
declare const EnvState: any;
declare const Prop: any;
declare const Env: any;
declare const env: any;
declare const tag: any;
declare const htmlTag: any;
declare const required: any;

export { DLightHtmlTag, Env, EnvState, Prop, PropState, State, _, a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button, canvas, caption, cite, code, col, colgroup, data, datalist, dd, Types as default, del, details, dfn, dialog, div, dl, dt, em, embed, env, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, htmlTag, i, iframe, img, input, ins, kbd, label, legend, li, link, main, map, mark, menu, meta, meter, nav, noscript, object, ol, optgroup, option, output, p, param, picture, pre, progress, q, required, rp, rt, ruby, s, samp, script, section, select, slot, small, source, span, strong, style, sub, summary, sup, table, tag, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, u, ul, video, wbr };
