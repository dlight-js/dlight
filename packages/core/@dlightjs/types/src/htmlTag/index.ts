import { type HTMLAttributes } from "./htmlElement"
import { type HtmlNode } from "@dlightjs/dlight"

type HtmlLifecycleFuncType = ((el?: HTMLElement, node?: HtmlNode) => void) | undefined
interface DLightHtmlProps {
  do: (node: HtmlNode) => void
  forwardProps: true
  className: string | string[] | undefined | undefined[]
  element: HTMLElement | ((holder: HTMLElement) => void) | undefined
  willAppear: HtmlLifecycleFuncType
  didAppear: HtmlLifecycleFuncType
  willDisappear: HtmlLifecycleFuncType
  didDisappear: HtmlLifecycleFuncType
}

type DLightHTMLAttributes<T, G> = DLightHtmlProps & HTMLAttributes<T> & G

export type DLightHTMLAttributesFunc<T, G> = {
  [K in keyof DLightHTMLAttributes<T, G>]: (value: DLightHTMLAttributes<T, G>[K] | undefined) => (
    K extends "className"
      ? DLightHTMLAttributesFunc<T, G>
      : Omit<DLightHTMLAttributesFunc<T, G>, K>
  )
}

export type DLightHtmlTagFunc<T=HTMLElement, G={}> = (innerText?: string | number) => DLightHTMLAttributesFunc<T, G>

export const a: DLightHtmlTagFunc<HTMLAnchorElement> = null as any
export const abbr: DLightHtmlTagFunc<HTMLElement> = null as any
export const address: DLightHtmlTagFunc<HTMLElement> = null as any
export const area: DLightHtmlTagFunc<HTMLAreaElement> = null as any
export const article: DLightHtmlTagFunc<HTMLElement> = null as any
export const aside: DLightHtmlTagFunc<HTMLElement> = null as any
export const audio: DLightHtmlTagFunc<HTMLAudioElement> = null as any
export const b: DLightHtmlTagFunc<HTMLElement> = null as any
export const base: DLightHtmlTagFunc<HTMLBaseElement> = null as any
export const bdi: DLightHtmlTagFunc<HTMLElement> = null as any
export const bdo: DLightHtmlTagFunc<HTMLElement> = null as any
export const blockquote: DLightHtmlTagFunc<HTMLQuoteElement> = null as any
export const body: DLightHtmlTagFunc<HTMLBodyElement> = null as any
export const br: DLightHtmlTagFunc<HTMLBRElement> = null as any
export const button: DLightHtmlTagFunc<HTMLButtonElement> = null as any
export const canvas: DLightHtmlTagFunc<HTMLCanvasElement> = null as any
export const caption: DLightHtmlTagFunc<HTMLTableCaptionElement> = null as any
export const cite: DLightHtmlTagFunc<HTMLElement> = null as any
export const code: DLightHtmlTagFunc<HTMLElement> = null as any
export const col: DLightHtmlTagFunc<HTMLTableColElement> = null as any
export const colgroup: DLightHtmlTagFunc<HTMLTableColElement> = null as any
export const data: DLightHtmlTagFunc<HTMLDataElement> = null as any
export const datalist: DLightHtmlTagFunc<HTMLDataListElement> = null as any
export const dd: DLightHtmlTagFunc<HTMLElement> = null as any
export const del: DLightHtmlTagFunc<HTMLModElement> = null as any
export const details: DLightHtmlTagFunc<HTMLDetailsElement> = null as any
export const dfn: DLightHtmlTagFunc<HTMLElement> = null as any
export const dialog: DLightHtmlTagFunc<HTMLDialogElement> = null as any
export const div: DLightHtmlTagFunc<HTMLDivElement> = null as any
export const dl: DLightHtmlTagFunc<HTMLDListElement> = null as any
export const dt: DLightHtmlTagFunc<HTMLElement> = null as any
export const em: DLightHtmlTagFunc<HTMLElement> = null as any
export const embed: DLightHtmlTagFunc<HTMLEmbedElement> = null as any
export const fieldset: DLightHtmlTagFunc<HTMLFieldSetElement> = null as any
export const figcaption: DLightHtmlTagFunc<HTMLElement> = null as any
export const figure: DLightHtmlTagFunc<HTMLElement> = null as any
export const footer: DLightHtmlTagFunc<HTMLElement> = null as any
export const form: DLightHtmlTagFunc<HTMLFormElement> = null as any
export const h1: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const h2: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const h3: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const h4: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const h5: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const h6: DLightHtmlTagFunc<HTMLHeadingElement> = null as any
export const head: DLightHtmlTagFunc<HTMLHeadElement> = null as any
export const header: DLightHtmlTagFunc<HTMLElement> = null as any
export const hgroup: DLightHtmlTagFunc<HTMLElement> = null as any
export const hr: DLightHtmlTagFunc<HTMLHRElement> = null as any
export const html: DLightHtmlTagFunc<HTMLHtmlElement> = null as any
export const i: DLightHtmlTagFunc<HTMLElement> = null as any
export const iframe: DLightHtmlTagFunc<HTMLIFrameElement> = null as any
export const img: DLightHtmlTagFunc<HTMLImageElement> = null as any
export const input: DLightHtmlTagFunc<HTMLInputElement> = null as any
export const ins: DLightHtmlTagFunc<HTMLModElement> = null as any
export const kbd: DLightHtmlTagFunc<HTMLElement> = null as any
export const label: DLightHtmlTagFunc<HTMLLabelElement> = null as any
export const legend: DLightHtmlTagFunc<HTMLLegendElement> = null as any
export const li: DLightHtmlTagFunc<HTMLLIElement> = null as any
export const link: DLightHtmlTagFunc<HTMLLinkElement> = null as any
export const main: DLightHtmlTagFunc<HTMLElement> = null as any
export const map: DLightHtmlTagFunc<HTMLMapElement> = null as any
export const mark: DLightHtmlTagFunc<HTMLElement> = null as any
export const menu: DLightHtmlTagFunc<HTMLMenuElement> = null as any
export const meta: DLightHtmlTagFunc<HTMLMetaElement> = null as any
export const meter: DLightHtmlTagFunc<HTMLMeterElement> = null as any
export const nav: DLightHtmlTagFunc<HTMLElement> = null as any
export const noscript: DLightHtmlTagFunc<HTMLElement> = null as any
export const object: DLightHtmlTagFunc<HTMLObjectElement> = null as any
export const ol: DLightHtmlTagFunc<HTMLOListElement> = null as any
export const optgroup: DLightHtmlTagFunc<HTMLOptGroupElement> = null as any
export const option: DLightHtmlTagFunc<HTMLOptionElement> = null as any
export const output: DLightHtmlTagFunc<HTMLOutputElement> = null as any
export const p: DLightHtmlTagFunc<HTMLParagraphElement> = null as any
export const picture: DLightHtmlTagFunc<HTMLPictureElement> = null as any
export const pre: DLightHtmlTagFunc<HTMLPreElement> = null as any
export const progress: DLightHtmlTagFunc<HTMLProgressElement> = null as any
export const q: DLightHtmlTagFunc<HTMLQuoteElement> = null as any
export const rp: DLightHtmlTagFunc<HTMLElement> = null as any
export const rt: DLightHtmlTagFunc<HTMLElement> = null as any
export const ruby: DLightHtmlTagFunc<HTMLElement> = null as any
export const s: DLightHtmlTagFunc<HTMLElement> = null as any
export const samp: DLightHtmlTagFunc<HTMLElement> = null as any
export const script: DLightHtmlTagFunc<HTMLScriptElement> = null as any
export const section: DLightHtmlTagFunc<HTMLElement> = null as any
export const select: DLightHtmlTagFunc<HTMLSelectElement> = null as any
export const slot: DLightHtmlTagFunc<HTMLSlotElement> = null as any
export const small: DLightHtmlTagFunc<HTMLElement> = null as any
export const source: DLightHtmlTagFunc<HTMLSourceElement> = null as any
export const span: DLightHtmlTagFunc<HTMLSpanElement> = null as any
export const strong: DLightHtmlTagFunc<HTMLElement> = null as any
export const style: DLightHtmlTagFunc<HTMLStyleElement> = null as any
export const sub: DLightHtmlTagFunc<HTMLElement> = null as any
export const summary: DLightHtmlTagFunc<HTMLElement> = null as any
export const sup: DLightHtmlTagFunc<HTMLElement> = null as any
export const table: DLightHtmlTagFunc<HTMLTableElement> = null as any
export const tbody: DLightHtmlTagFunc<HTMLTableSectionElement> = null as any
export const td: DLightHtmlTagFunc<HTMLTableCellElement> = null as any
export const template: DLightHtmlTagFunc<HTMLTemplateElement> = null as any
export const textarea: DLightHtmlTagFunc<HTMLTextAreaElement> = null as any
export const tfoot: DLightHtmlTagFunc<HTMLTableSectionElement> = null as any
export const th: DLightHtmlTagFunc<HTMLTableCellElement> = null as any
export const thead: DLightHtmlTagFunc<HTMLTableSectionElement> = null as any
export const time: DLightHtmlTagFunc<HTMLTimeElement> = null as any
export const title: DLightHtmlTagFunc<HTMLTitleElement> = null as any
export const tr: DLightHtmlTagFunc<HTMLTableRowElement> = null as any
export const track: DLightHtmlTagFunc<HTMLTrackElement> = null as any
export const u: DLightHtmlTagFunc<HTMLElement> = null as any
export const ul: DLightHtmlTagFunc<HTMLUListElement> = null as any
export const var_: DLightHtmlTagFunc<HTMLElement> = null as any
export const video: DLightHtmlTagFunc<HTMLVideoElement> = null as any
export const wbr: DLightHtmlTagFunc<HTMLElement> = null as any
export const acronym: DLightHtmlTagFunc<HTMLElement> = null as any
export const applet: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const basefont: DLightHtmlTagFunc<HTMLElement> = null as any
export const bgsound: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const big: DLightHtmlTagFunc<HTMLElement> = null as any
export const blink: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const center: DLightHtmlTagFunc<HTMLElement> = null as any
export const dir: DLightHtmlTagFunc<HTMLDirectoryElement> = null as any
export const font: DLightHtmlTagFunc<HTMLFontElement> = null as any
export const frame: DLightHtmlTagFunc<HTMLFrameElement> = null as any
export const frameset: DLightHtmlTagFunc<HTMLFrameSetElement> = null as any
export const isindex: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const keygen: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const listing: DLightHtmlTagFunc<HTMLPreElement> = null as any
export const marquee: DLightHtmlTagFunc<HTMLMarqueeElement> = null as any
export const menuitem: DLightHtmlTagFunc<HTMLElement> = null as any
export const multicol: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const nextid: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const nobr: DLightHtmlTagFunc<HTMLElement> = null as any
export const noembed: DLightHtmlTagFunc<HTMLElement> = null as any
export const noframes: DLightHtmlTagFunc<HTMLElement> = null as any
export const param: DLightHtmlTagFunc<HTMLParamElement> = null as any
export const plaintext: DLightHtmlTagFunc<HTMLElement> = null as any
export const rb: DLightHtmlTagFunc<HTMLElement> = null as any
export const rtc: DLightHtmlTagFunc<HTMLElement> = null as any
export const spacer: DLightHtmlTagFunc<HTMLUnknownElement> = null as any
export const strike: DLightHtmlTagFunc<HTMLElement> = null as any
export const tt: DLightHtmlTagFunc<HTMLElement> = null as any
export const xmp: DLightHtmlTagFunc<HTMLPreElement> = null as any
export const animate: DLightHtmlTagFunc<SVGAnimateElement> = null as any
export const animateMotion: DLightHtmlTagFunc<SVGAnimateMotionElement> = null as any
export const animateTransform: DLightHtmlTagFunc<SVGAnimateTransformElement> = null as any
export const circle: DLightHtmlTagFunc<SVGCircleElement> = null as any
export const clipPath: DLightHtmlTagFunc<SVGClipPathElement> = null as any
export const defs: DLightHtmlTagFunc<SVGDefsElement> = null as any
export const desc: DLightHtmlTagFunc<SVGDescElement> = null as any
export const ellipse: DLightHtmlTagFunc<SVGEllipseElement> = null as any
export const feBlend: DLightHtmlTagFunc<SVGFEBlendElement> = null as any
export const feColorMatrix: DLightHtmlTagFunc<SVGFEColorMatrixElement> = null as any
export const feComponentTransfer: DLightHtmlTagFunc<SVGFEComponentTransferElement> = null as any
export const feComposite: DLightHtmlTagFunc<SVGFECompositeElement> = null as any
export const feConvolveMatrix: DLightHtmlTagFunc<SVGFEConvolveMatrixElement> = null as any
export const feDiffuseLighting: DLightHtmlTagFunc<SVGFEDiffuseLightingElement> = null as any
export const feDisplacementMap: DLightHtmlTagFunc<SVGFEDisplacementMapElement> = null as any
export const feDistantLight: DLightHtmlTagFunc<SVGFEDistantLightElement> = null as any
export const feDropShadow: DLightHtmlTagFunc<SVGFEDropShadowElement> = null as any
export const feFlood: DLightHtmlTagFunc<SVGFEFloodElement> = null as any
export const feFuncA: DLightHtmlTagFunc<SVGFEFuncAElement> = null as any
export const feFuncB: DLightHtmlTagFunc<SVGFEFuncBElement> = null as any
export const feFuncG: DLightHtmlTagFunc<SVGFEFuncGElement> = null as any
export const feFuncR: DLightHtmlTagFunc<SVGFEFuncRElement> = null as any
export const feGaussianBlur: DLightHtmlTagFunc<SVGFEGaussianBlurElement> = null as any
export const feImage: DLightHtmlTagFunc<SVGFEImageElement> = null as any
export const feMerge: DLightHtmlTagFunc<SVGFEMergeElement> = null as any
export const feMergeNode: DLightHtmlTagFunc<SVGFEMergeNodeElement> = null as any
export const feMorphology: DLightHtmlTagFunc<SVGFEMorphologyElement> = null as any
export const feOffset: DLightHtmlTagFunc<SVGFEOffsetElement> = null as any
export const fePointLight: DLightHtmlTagFunc<SVGFEPointLightElement> = null as any
export const feSpecularLighting: DLightHtmlTagFunc<SVGFESpecularLightingElement> = null as any
export const feSpotLight: DLightHtmlTagFunc<SVGFESpotLightElement> = null as any
export const feTile: DLightHtmlTagFunc<SVGFETileElement> = null as any
export const feTurbulence: DLightHtmlTagFunc<SVGFETurbulenceElement> = null as any
export const filter: DLightHtmlTagFunc<SVGFilterElement> = null as any
export const foreignObject: DLightHtmlTagFunc<SVGForeignObjectElement> = null as any
export const g: DLightHtmlTagFunc<SVGGElement> = null as any
export const image: DLightHtmlTagFunc<SVGImageElement> = null as any
export const line: DLightHtmlTagFunc<SVGLineElement> = null as any
export const linearGradient: DLightHtmlTagFunc<SVGLinearGradientElement> = null as any
export const marker: DLightHtmlTagFunc<SVGMarkerElement> = null as any
export const mask: DLightHtmlTagFunc<SVGMaskElement> = null as any
export const metadata: DLightHtmlTagFunc<SVGMetadataElement> = null as any
export const mpath: DLightHtmlTagFunc<SVGMPathElement> = null as any
export const path: DLightHtmlTagFunc<SVGPathElement> = null as any
export const pattern: DLightHtmlTagFunc<SVGPatternElement> = null as any
export const polygon: DLightHtmlTagFunc<SVGPolygonElement> = null as any
export const polyline: DLightHtmlTagFunc<SVGPolylineElement> = null as any
export const radialGradient: DLightHtmlTagFunc<SVGRadialGradientElement> = null as any
export const rect: DLightHtmlTagFunc<SVGRectElement> = null as any
export const set: DLightHtmlTagFunc<SVGSetElement> = null as any
export const stop: DLightHtmlTagFunc<SVGStopElement> = null as any
export const svg: DLightHtmlTagFunc<SVGSVGElement> = null as any
export const switch_: DLightHtmlTagFunc<SVGSwitchElement> = null as any
export const symbol: DLightHtmlTagFunc<SVGSymbolElement> = null as any
export const text: DLightHtmlTagFunc<SVGTextElement> = null as any
export const textPath: DLightHtmlTagFunc<SVGTextPathElement> = null as any
export const tspan: DLightHtmlTagFunc<SVGTSpanElement> = null as any
export const use: DLightHtmlTagFunc<SVGUseElement> = null as any
export const view: DLightHtmlTagFunc<SVGViewElement> = null as any
