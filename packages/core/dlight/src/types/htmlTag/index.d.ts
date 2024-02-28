import type { DLightGlobalEventHandlers } from "./event"
import type { OmitIndexSignature, HTMLAttributes } from "./htmlElement"

// ---- If there is an event(start with on), remove it
export type PropertyWithEvent<G> = Omit<
  G,
  {
    [K in keyof G]: K extends `on${string}` ? K : never
  }[keyof G]
> &
  DLightGlobalEventHandlers

interface DLightHtmlProps<El> {
  element: El | ((holder: El) => void) | undefined
  prop: Record<string, string | number | boolean>
  attr: Record<string, string>
  dataset: Record<string, string>
  forwardProps: true | undefined
  willMount: (el: El) => void
  didMount: (el: El) => void
  willUnmount: (el: El) => void
  didUnmount: (el: El) => void
  didUpdate: <T>(el: El, key: string, prevValue: T, currValue: T) => void
}

export type DLightHTMLAttributes<T, G, El> = DLightHtmlProps<El> &
  HTMLAttributes<T> &
  G

export type DLightHTMLAttributesFunc<T, G, El> = {
  [K in keyof DLightHTMLAttributes<T, G, El>]: (
    value?: DLightHTMLAttributes<T, G, El>[K]
  ) => Omit<DLightHTMLAttributesFunc<T, G, El>, K>
}

export type DLightHtmlTagFunc<T = HTMLElement, G = object> = (
  innerText?: string | number | ((View: never) => void)
) => DLightHTMLAttributesFunc<PropertyWithEvent<OmitIndexSignature<T>>, G, T>

export const a: DLightHtmlTagFunc<HTMLAnchorElement>
export const abbr: DLightHtmlTagFunc
export const address: DLightHtmlTagFunc
export const area: DLightHtmlTagFunc<HTMLAreaElement>
export const article: DLightHtmlTagFunc
export const aside: DLightHtmlTagFunc
export const audio: DLightHtmlTagFunc<HTMLAudioElement>
export const b: DLightHtmlTagFunc
export const base: DLightHtmlTagFunc<HTMLBaseElement>
export const bdi: DLightHtmlTagFunc
export const bdo: DLightHtmlTagFunc
export const blockquote: DLightHtmlTagFunc<HTMLQuoteElement>
export const body: DLightHtmlTagFunc<HTMLBodyElement>
export const br: DLightHtmlTagFunc<HTMLBRElement>
export const button: DLightHtmlTagFunc<HTMLButtonElement>
export const canvas: DLightHtmlTagFunc<HTMLCanvasElement>
export const caption: DLightHtmlTagFunc<HTMLTableCaptionElement>
export const cite: DLightHtmlTagFunc
export const code: DLightHtmlTagFunc
export const col: DLightHtmlTagFunc<HTMLTableColElement>
export const colgroup: DLightHtmlTagFunc<HTMLTableColElement>
export const data: DLightHtmlTagFunc<HTMLDataElement>
export const datalist: DLightHtmlTagFunc<HTMLDataListElement>
export const dd: DLightHtmlTagFunc
export const del: DLightHtmlTagFunc<HTMLModElement>
export const details: DLightHtmlTagFunc<HTMLDetailsElement>
export const dfn: DLightHtmlTagFunc
export const dialog: DLightHtmlTagFunc<HTMLDialogElement>
export const div: DLightHtmlTagFunc<HTMLDivElement>
export const dl: DLightHtmlTagFunc<HTMLDListElement>
export const dt: DLightHtmlTagFunc
export const em: DLightHtmlTagFunc
export const embed: DLightHtmlTagFunc<HTMLEmbedElement>
export const fieldset: DLightHtmlTagFunc<HTMLFieldSetElement>
export const figcaption: DLightHtmlTagFunc
export const figure: DLightHtmlTagFunc
export const footer: DLightHtmlTagFunc
export const form: DLightHtmlTagFunc<HTMLFormElement>
export const h1: DLightHtmlTagFunc<HTMLHeadingElement>
export const h2: DLightHtmlTagFunc<HTMLHeadingElement>
export const h3: DLightHtmlTagFunc<HTMLHeadingElement>
export const h4: DLightHtmlTagFunc<HTMLHeadingElement>
export const h5: DLightHtmlTagFunc<HTMLHeadingElement>
export const h6: DLightHtmlTagFunc<HTMLHeadingElement>
export const head: DLightHtmlTagFunc<HTMLHeadElement>
export const header: DLightHtmlTagFunc
export const hgroup: DLightHtmlTagFunc
export const hr: DLightHtmlTagFunc<HTMLHRElement>
export const html: DLightHtmlTagFunc<HTMLHtmlElement>
export const i: DLightHtmlTagFunc
export const iframe: DLightHtmlTagFunc<HTMLIFrameElement>
export const img: DLightHtmlTagFunc<HTMLImageElement>
export const input: DLightHtmlTagFunc<HTMLInputElement>
export const ins: DLightHtmlTagFunc<HTMLModElement>
export const kbd: DLightHtmlTagFunc
export const label: DLightHtmlTagFunc<HTMLLabelElement>
export const legend: DLightHtmlTagFunc<HTMLLegendElement>
export const li: DLightHtmlTagFunc<HTMLLIElement>
export const link: DLightHtmlTagFunc<HTMLLinkElement>
export const main: DLightHtmlTagFunc
export const map: DLightHtmlTagFunc<HTMLMapElement>
export const mark: DLightHtmlTagFunc
export const menu: DLightHtmlTagFunc<HTMLMenuElement>
export const meta: DLightHtmlTagFunc<HTMLMetaElement>
export const meter: DLightHtmlTagFunc<HTMLMeterElement>
export const nav: DLightHtmlTagFunc
export const noscript: DLightHtmlTagFunc
export const object: DLightHtmlTagFunc<HTMLObjectElement>
export const ol: DLightHtmlTagFunc<HTMLOListElement>
export const optgroup: DLightHtmlTagFunc<HTMLOptGroupElement>
export const option: DLightHtmlTagFunc<HTMLOptionElement>
export const output: DLightHtmlTagFunc<HTMLOutputElement>
export const p: DLightHtmlTagFunc<HTMLParagraphElement>
export const picture: DLightHtmlTagFunc<HTMLPictureElement>
export const pre: DLightHtmlTagFunc<HTMLPreElement>
export const progress: DLightHtmlTagFunc<HTMLProgressElement>
export const q: DLightHtmlTagFunc<HTMLQuoteElement>
export const rp: DLightHtmlTagFunc
export const rt: DLightHtmlTagFunc
export const ruby: DLightHtmlTagFunc
export const s: DLightHtmlTagFunc
export const samp: DLightHtmlTagFunc
export const script: DLightHtmlTagFunc<HTMLScriptElement>
export const section: DLightHtmlTagFunc
export const select: DLightHtmlTagFunc<HTMLSelectElement>
export const slot: DLightHtmlTagFunc<HTMLSlotElement>
export const small: DLightHtmlTagFunc
export const source: DLightHtmlTagFunc<HTMLSourceElement>
export const span: DLightHtmlTagFunc<HTMLSpanElement>
export const strong: DLightHtmlTagFunc
export const style: DLightHtmlTagFunc<HTMLStyleElement>
export const sub: DLightHtmlTagFunc
export const summary: DLightHtmlTagFunc
export const sup: DLightHtmlTagFunc
export const table: DLightHtmlTagFunc<HTMLTableElement>
export const tbody: DLightHtmlTagFunc<HTMLTableSectionElement>
export const td: DLightHtmlTagFunc<HTMLTableCellElement>
export const template: DLightHtmlTagFunc<HTMLTemplateElement>
export const textarea: DLightHtmlTagFunc<HTMLTextAreaElement>
export const tfoot: DLightHtmlTagFunc<HTMLTableSectionElement>
export const th: DLightHtmlTagFunc<HTMLTableCellElement>
export const thead: DLightHtmlTagFunc<HTMLTableSectionElement>
export const time: DLightHtmlTagFunc<HTMLTimeElement>
export const title: DLightHtmlTagFunc<HTMLTitleElement>
export const tr: DLightHtmlTagFunc<HTMLTableRowElement>
export const track: DLightHtmlTagFunc<HTMLTrackElement>
export const u: DLightHtmlTagFunc
export const ul: DLightHtmlTagFunc<HTMLUListElement>
export const var_: DLightHtmlTagFunc
export const video: DLightHtmlTagFunc<HTMLVideoElement>
export const wbr: DLightHtmlTagFunc
export const acronym: DLightHtmlTagFunc
export const applet: DLightHtmlTagFunc<HTMLUnknownElement>
export const basefont: DLightHtmlTagFunc
export const bgsound: DLightHtmlTagFunc<HTMLUnknownElement>
export const big: DLightHtmlTagFunc
export const blink: DLightHtmlTagFunc<HTMLUnknownElement>
export const center: DLightHtmlTagFunc
export const dir: DLightHtmlTagFunc<HTMLDirectoryElement>
export const font: DLightHtmlTagFunc<HTMLFontElement>
export const frame: DLightHtmlTagFunc<HTMLFrameElement>
export const frameset: DLightHtmlTagFunc<HTMLFrameSetElement>
export const isindex: DLightHtmlTagFunc<HTMLUnknownElement>
export const keygen: DLightHtmlTagFunc<HTMLUnknownElement>
export const listing: DLightHtmlTagFunc<HTMLPreElement>
export const marquee: DLightHtmlTagFunc<HTMLMarqueeElement>
export const menuitem: DLightHtmlTagFunc
export const multicol: DLightHtmlTagFunc<HTMLUnknownElement>
export const nextid: DLightHtmlTagFunc<HTMLUnknownElement>
export const nobr: DLightHtmlTagFunc
export const noembed: DLightHtmlTagFunc
export const noframes: DLightHtmlTagFunc
export const param: DLightHtmlTagFunc<HTMLParamElement>
export const plaintext: DLightHtmlTagFunc
export const rb: DLightHtmlTagFunc
export const rtc: DLightHtmlTagFunc
export const spacer: DLightHtmlTagFunc<HTMLUnknownElement>
export const strike: DLightHtmlTagFunc
export const tt: DLightHtmlTagFunc
export const xmp: DLightHtmlTagFunc<HTMLPreElement>
export const animate: DLightHtmlTagFunc<SVGAnimateElement>
export const animateMotion: DLightHtmlTagFunc<SVGAnimateMotionElement>
export const animateTransform: DLightHtmlTagFunc<SVGAnimateTransformElement>
export const circle: DLightHtmlTagFunc<SVGCircleElement>
export const clipPath: DLightHtmlTagFunc<SVGClipPathElement>
export const defs: DLightHtmlTagFunc<SVGDefsElement>
export const desc: DLightHtmlTagFunc<SVGDescElement>
export const ellipse: DLightHtmlTagFunc<SVGEllipseElement>
export const feBlend: DLightHtmlTagFunc<SVGFEBlendElement>
export const feColorMatrix: DLightHtmlTagFunc<SVGFEColorMatrixElement>
export const feComponentTransfer: DLightHtmlTagFunc<SVGFEComponentTransferElement>
export const feComposite: DLightHtmlTagFunc<SVGFECompositeElement>
export const feConvolveMatrix: DLightHtmlTagFunc<SVGFEConvolveMatrixElement>
export const feDiffuseLighting: DLightHtmlTagFunc<SVGFEDiffuseLightingElement>
export const feDisplacementMap: DLightHtmlTagFunc<SVGFEDisplacementMapElement>
export const feDistantLight: DLightHtmlTagFunc<SVGFEDistantLightElement>
export const feDropShadow: DLightHtmlTagFunc<SVGFEDropShadowElement>
export const feFlood: DLightHtmlTagFunc<SVGFEFloodElement>
export const feFuncA: DLightHtmlTagFunc<SVGFEFuncAElement>
export const feFuncB: DLightHtmlTagFunc<SVGFEFuncBElement>
export const feFuncG: DLightHtmlTagFunc<SVGFEFuncGElement>
export const feFuncR: DLightHtmlTagFunc<SVGFEFuncRElement>
export const feGaussianBlur: DLightHtmlTagFunc<SVGFEGaussianBlurElement>
export const feImage: DLightHtmlTagFunc<SVGFEImageElement>
export const feMerge: DLightHtmlTagFunc<SVGFEMergeElement>
export const feMergeNode: DLightHtmlTagFunc<SVGFEMergeNodeElement>
export const feMorphology: DLightHtmlTagFunc<SVGFEMorphologyElement>
export const feOffset: DLightHtmlTagFunc<SVGFEOffsetElement>
export const fePointLight: DLightHtmlTagFunc<SVGFEPointLightElement>
export const feSpecularLighting: DLightHtmlTagFunc<SVGFESpecularLightingElement>
export const feSpotLight: DLightHtmlTagFunc<SVGFESpotLightElement>
export const feTile: DLightHtmlTagFunc<SVGFETileElement>
export const feTurbulence: DLightHtmlTagFunc<SVGFETurbulenceElement>
export const filter: DLightHtmlTagFunc<SVGFilterElement>
export const foreignObject: DLightHtmlTagFunc<SVGForeignObjectElement>
export const g: DLightHtmlTagFunc<SVGGElement>
export const image: DLightHtmlTagFunc<SVGImageElement>
export const line: DLightHtmlTagFunc<SVGLineElement>
export const linearGradient: DLightHtmlTagFunc<SVGLinearGradientElement>
export const marker: DLightHtmlTagFunc<SVGMarkerElement>
export const mask: DLightHtmlTagFunc<SVGMaskElement>
export const metadata: DLightHtmlTagFunc<SVGMetadataElement>
export const mpath: DLightHtmlTagFunc<SVGMPathElement>
export const path: DLightHtmlTagFunc<SVGPathElement>
export const pattern: DLightHtmlTagFunc<SVGPatternElement>
export const polygon: DLightHtmlTagFunc<SVGPolygonElement>
export const polyline: DLightHtmlTagFunc<SVGPolylineElement>
export const radialGradient: DLightHtmlTagFunc<SVGRadialGradientElement>
export const rect: DLightHtmlTagFunc<SVGRectElement>
export const set: DLightHtmlTagFunc<SVGSetElement>
export const stop: DLightHtmlTagFunc<SVGStopElement>
export const svg: DLightHtmlTagFunc<SVGSVGElement>
export const switch_: DLightHtmlTagFunc<SVGSwitchElement>
export const symbol: DLightHtmlTagFunc<SVGSymbolElement>
export const text: DLightHtmlTagFunc<SVGTextElement>
export const textPath: DLightHtmlTagFunc<SVGTextPathElement>
export const tspan: DLightHtmlTagFunc<SVGTSpanElement>
// export const use: DLightHtmlTagFunc<SVGUseElement>
export const view: DLightHtmlTagFunc<SVGViewElement>
