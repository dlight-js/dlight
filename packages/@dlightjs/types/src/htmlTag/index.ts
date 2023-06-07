import { type DLightHTMLElement } from "./htmlElement"
import { type HtmlNode } from "@dlightjs/dlight"
import type * as S from "./specificElement"

type HtmlLifecycleFuncType<T> = (func: (el?: HTMLElement, node?: HtmlNode) => void) => T
export interface DLightHtmlHook<T> {
  element: (holderOrFunc: HTMLElement | ((holder: HTMLElement) => void) | undefined) => T
  willAppear: HtmlLifecycleFuncType<T>
  didAppear: HtmlLifecycleFuncType<T>
  willDisappear: HtmlLifecycleFuncType<T>
  didDisappear: HtmlLifecycleFuncType<T>
}

export type DLightHtmlTag<T, G=DLightHTMLElement<T>> = G & DLightHtmlHook<T>

interface DLightHtmlTagSpecific extends DLightHtmlTag<DLightHtmlTagSpecific> {}
type DLightHtmlTagFunc<T=DLightHtmlTagSpecific> = (innerText?: string | number) => T

export const a: DLightHtmlTagFunc<S.DLightHtmlASpecific> = null as any
export const abbr: DLightHtmlTagFunc = null as any
export const address: DLightHtmlTagFunc = null as any
export const area: DLightHtmlTagFunc<S.DLightHtmlAreaSpecific> = null as any
export const article: DLightHtmlTagFunc = null as any
export const aside: DLightHtmlTagFunc = null as any
export const audio: DLightHtmlTagFunc<S.DLightHtmlAudioSpecific> = null as any
export const b: DLightHtmlTagFunc = null as any
export const base: DLightHtmlTagFunc<S.DLightHtmlBaseSpecific> = null as any
export const bdi: DLightHtmlTagFunc = null as any
export const bdo: DLightHtmlTagFunc = null as any
export const blockquote: DLightHtmlTagFunc = null as any
export const body: DLightHtmlTagFunc<S.DLightHtmlBodySpecific> = null as any
export const br: DLightHtmlTagFunc<S.DLightHtmlBRSpecific> = null as any
export const button: DLightHtmlTagFunc<S.DLightHtmlButtonSpecific> = null as any
export const canvas: DLightHtmlTagFunc<S.DLightHtmlCanvasSpecific> = null as any
export const caption: DLightHtmlTagFunc = null as any
export const cite: DLightHtmlTagFunc = null as any
export const code: DLightHtmlTagFunc = null as any
export const col: DLightHtmlTagFunc = null as any
export const colgroup: DLightHtmlTagFunc = null as any
export const data: DLightHtmlTagFunc = null as any
export const datalist: DLightHtmlTagFunc = null as any
export const dd: DLightHtmlTagFunc = null as any
export const del: DLightHtmlTagFunc = null as any
export const details: DLightHtmlTagFunc = null as any
export const dfn: DLightHtmlTagFunc = null as any
export const dialog: DLightHtmlTagFunc = null as any
export const div: DLightHtmlTagFunc<S.DLightHtmlDivSpecific> = null as any
export const dl: DLightHtmlTagFunc = null as any
export const dt: DLightHtmlTagFunc = null as any
export const em: DLightHtmlTagFunc = null as any
export const embed: DLightHtmlTagFunc = null as any
export const fieldset: DLightHtmlTagFunc = null as any
export const figcaption: DLightHtmlTagFunc = null as any
export const figure: DLightHtmlTagFunc = null as any
export const footer: DLightHtmlTagFunc = null as any
export const form: DLightHtmlTagFunc = null as any
export const h1: DLightHtmlTagFunc = null as any
export const h2: DLightHtmlTagFunc = null as any
export const h3: DLightHtmlTagFunc = null as any
export const h4: DLightHtmlTagFunc = null as any
export const h5: DLightHtmlTagFunc = null as any
export const h6: DLightHtmlTagFunc = null as any
export const head: DLightHtmlTagFunc = null as any
export const header: DLightHtmlTagFunc = null as any
export const hgroup: DLightHtmlTagFunc = null as any
export const hr: DLightHtmlTagFunc = null as any
export const html: DLightHtmlTagFunc = null as any
export const i: DLightHtmlTagFunc = null as any
export const iframe: DLightHtmlTagFunc = null as any
export const img: DLightHtmlTagFunc<S.DLightHtmlImageSpecific> = null as any
export const input: DLightHtmlTagFunc<S.DLightHtmlInputSpecific> = null as any
export const ins: DLightHtmlTagFunc = null as any
export const kbd: DLightHtmlTagFunc = null as any
export const label: DLightHtmlTagFunc = null as any
export const legend: DLightHtmlTagFunc = null as any
export const li: DLightHtmlTagFunc = null as any
export const link: DLightHtmlTagFunc = null as any
export const main: DLightHtmlTagFunc = null as any
export const map: DLightHtmlTagFunc = null as any
export const mark: DLightHtmlTagFunc = null as any
export const menu: DLightHtmlTagFunc = null as any
export const meta: DLightHtmlTagFunc = null as any
export const meter: DLightHtmlTagFunc = null as any
export const nav: DLightHtmlTagFunc = null as any
export const noscript: DLightHtmlTagFunc = null as any
export const object: DLightHtmlTagFunc = null as any
export const ol: DLightHtmlTagFunc = null as any
export const optgroup: DLightHtmlTagFunc = null as any
export const option: DLightHtmlTagFunc = null as any
export const output: DLightHtmlTagFunc = null as any
export const p: DLightHtmlTagFunc = null as any
export const param: DLightHtmlTagFunc = null as any
export const picture: DLightHtmlTagFunc = null as any
export const pre: DLightHtmlTagFunc = null as any
export const progress: DLightHtmlTagFunc = null as any
export const q: DLightHtmlTagFunc = null as any
export const rp: DLightHtmlTagFunc = null as any
export const rt: DLightHtmlTagFunc = null as any
export const ruby: DLightHtmlTagFunc = null as any
export const s: DLightHtmlTagFunc = null as any
export const samp: DLightHtmlTagFunc = null as any
export const script: DLightHtmlTagFunc = null as any
export const section: DLightHtmlTagFunc = null as any
export const select: DLightHtmlTagFunc<S.DLightHtmlSelectSpecific> = null as any
export const slot: DLightHtmlTagFunc = null as any
export const small: DLightHtmlTagFunc = null as any
export const source: DLightHtmlTagFunc = null as any
export const span: DLightHtmlTagFunc<S.DLightHtmlSpanSpecific> = null as any
export const strong: DLightHtmlTagFunc = null as any
export const style: DLightHtmlTagFunc = null as any
export const sub: DLightHtmlTagFunc = null as any
export const summary: DLightHtmlTagFunc = null as any
export const sup: DLightHtmlTagFunc = null as any
export const table: DLightHtmlTagFunc<S.DLightHtmlTableSpecific> = null as any
export const tbody: DLightHtmlTagFunc = null as any
export const td: DLightHtmlTagFunc = null as any
export const template: DLightHtmlTagFunc = null as any
export const textarea: DLightHtmlTagFunc<S.DLightHtmlTextAreaSpecific> = null as any
export const tfoot: DLightHtmlTagFunc = null as any
export const th: DLightHtmlTagFunc = null as any
export const thead: DLightHtmlTagFunc = null as any
export const time: DLightHtmlTagFunc = null as any
export const title: DLightHtmlTagFunc = null as any
export const tr: DLightHtmlTagFunc = null as any
export const track: DLightHtmlTagFunc = null as any
export const u: DLightHtmlTagFunc = null as any
export const ul: DLightHtmlTagFunc = null as any
export const video: DLightHtmlTagFunc = null as any
export const wbr: DLightHtmlTagFunc = null as any
