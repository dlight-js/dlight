import type { DLightGlobalEventHandlers } from "./event"
import type {
  OmitIndexSignature,
  HTMLAttributes,
  SVGAttributes,
} from "./htmlElement"

// ---- If there is an event(start with on), remove it
export type PropertyWithEvent<G> = Omit<
  G,
  {
    [K in keyof G]: K extends `on${string}` ? K : never
  }[keyof G]
> &
  DLightGlobalEventHandlers

interface DLightHtmlProps<El> {
  ref: El | ((holder: El) => void) | undefined
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

export type DLightSVGAttributes<T, G, El> = DLightHtmlProps<El> &
  SVGAttributes<T> &
  G

export type DLightHTMLAttributesFunc<T, G, El> = {
  [K in keyof DLightHTMLAttributes<T, G, El>]: (
    value?: DLightHTMLAttributes<T, G, El>[K]
  ) => Omit<DLightHTMLAttributesFunc<T, G, El>, K>
}

export type DLightSVGAttributesFunc<T, G, El> = {
  [K in keyof DLightSVGAttributes<T, G, El>]: (
    value?: DLightSVGAttributes<T, G, El>[K]
  ) => Omit<DLightSVGAttributesFunc<T, G, El>, K>
}

export type DLightHtmlTagFunc<T = HTMLElement, G = object> = (
  innerText?: string | number | ((View: never) => void)
) => DLightHTMLAttributesFunc<PropertyWithEvent<OmitIndexSignature<T>>, G, T>

export type DLightSvgTagFunc<T = SVGElement, G = object> = (
  innerText?: string | number | ((View: never) => void)
) => DLightSVGAttributesFunc<PropertyWithEvent<OmitIndexSignature<T>>, G, T>

type SVGPresentationAttrs = {
  alignmentBaseline: string
  baselineShift: string
  clip: string
  clipPath: string
  clipRule: string
  color: string
  colorInterpolation: string
  colorInterpolationFilters: string
  colorProfile: string
  colorRendering: string
  cursor: string
  direction: string
  display: string
  dominantBaseline: string
  enableBackground: string
  fill: string
  fillOpacity: string
  fillRule: string
  filter: string
  floodColor: string
  floodOpacity: string
  fontFamily: string
  fontSize: string | number
  fontSizeAdjust: string
  fontStretch: string
  fontStyle: string
  fontVariant: string
  fontWeight: string
  glyphOrientationHorizontal: string
  glyphOrientationVertical: string
  imageRendering: string
  kerning: string
  letterSpacing: string
  lightingColor: string
  markerEnd: string
  markerMid: string
  markerStart: string
  mask: string
  opacity: string | number
  overflow: string
  pointerEvents: string
  shapeRendering: string
  stopColor: string
  stopOpacity: string
  stroke: string
  strokeDasharray: string
  strokeDashoffset: string
  strokeLinecap: string
  strokeLinejoin: string
  strokeMiterlimit: string
  strokeOpacity: string
  strokeWidth: string | number
  textAnchor: string
  textDecoration: string
  textRendering: string
  unicodeBidi: string
  visibility: string
  wordSpacing: string
  writingMode: string
}

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
export const animate: DLightSvgTagFunc<SVGAnimateElement>
export const animateMotion: DLightSvgTagFunc<SVGAnimateMotionElement>
export const animateTransform: DLightSvgTagFunc<SVGAnimateTransformElement>
export const circle: DLightSvgTagFunc<SVGCircleElement & SVGPresentationAttrs>
export const clipPath: DLightSvgTagFunc<SVGClipPathElement>
export const defs: DLightSvgTagFunc<SVGDefsElement>
export const desc: DLightSvgTagFunc<SVGDescElement>
export const ellipse: DLightSvgTagFunc<SVGEllipseElement & SVGPresentationAttrs>
export const feBlend: DLightSvgTagFunc<SVGFEBlendElement>
export const feColorMatrix: DLightSvgTagFunc<SVGFEColorMatrixElement>
export const feComponentTransfer: DLightSvgTagFunc<SVGFEComponentTransferElement>
export const feComposite: DLightSvgTagFunc<SVGFECompositeElement>
export const feConvolveMatrix: DLightSvgTagFunc<SVGFEConvolveMatrixElement>
export const feDiffuseLighting: DLightSvgTagFunc<SVGFEDiffuseLightingElement>
export const feDisplacementMap: DLightSvgTagFunc<SVGFEDisplacementMapElement>
export const feDistantLight: DLightSvgTagFunc<SVGFEDistantLightElement>
export const feDropShadow: DLightSvgTagFunc<SVGFEDropShadowElement>
export const feFlood: DLightSvgTagFunc<SVGFEFloodElement>
export const feFuncA: DLightSvgTagFunc<SVGFEFuncAElement>
export const feFuncB: DLightSvgTagFunc<SVGFEFuncBElement>
export const feFuncG: DLightSvgTagFunc<SVGFEFuncGElement>
export const feFuncR: DLightSvgTagFunc<SVGFEFuncRElement>
export const feGaussianBlur: DLightSvgTagFunc<SVGFEGaussianBlurElement>
export const feImage: DLightSvgTagFunc<SVGFEImageElement>
export const feMerge: DLightSvgTagFunc<SVGFEMergeElement>
export const feMergeNode: DLightSvgTagFunc<SVGFEMergeNodeElement>
export const feMorphology: DLightSvgTagFunc<SVGFEMorphologyElement>
export const feOffset: DLightSvgTagFunc<SVGFEOffsetElement>
export const fePointLight: DLightSvgTagFunc<SVGFEPointLightElement>
export const feSpecularLighting: DLightSvgTagFunc<SVGFESpecularLightingElement>
export const feSpotLight: DLightSvgTagFunc<SVGFESpotLightElement>
export const feTile: DLightSvgTagFunc<SVGFETileElement>
export const feTurbulence: DLightSvgTagFunc<SVGFETurbulenceElement>
export const filter: DLightSvgTagFunc<SVGFilterElement>
export const foreignObject: DLightSvgTagFunc<SVGForeignObjectElement>
export const g: DLightSvgTagFunc<SVGGElement>
export const image: DLightSvgTagFunc<SVGImageElement>
export const line: DLightSvgTagFunc<SVGLineElement & SVGPresentationAttrs>
export const linearGradient: DLightSvgTagFunc<SVGLinearGradientElement>
export const marker: DLightSvgTagFunc<SVGMarkerElement>
export const mask: DLightSvgTagFunc<SVGMaskElement>
export const metadata: DLightSvgTagFunc<SVGMetadataElement>
export const mpath: DLightSvgTagFunc<SVGMPathElement>
export const path: DLightSvgTagFunc<
  SVGPathElement & SVGPresentationAttrs & { d: string }
>
export const pattern: DLightSvgTagFunc<SVGPatternElement>
export const polygon: DLightSvgTagFunc<SVGPolygonElement & SVGPresentationAttrs>
export const polyline: DLightSvgTagFunc<
  SVGPolylineElement & SVGPresentationAttrs
>
export const radialGradient: DLightSvgTagFunc<SVGRadialGradientElement>
export const rect: DLightSvgTagFunc<SVGRectElement & SVGPresentationAttrs>
export const set: DLightSvgTagFunc<SVGSetElement>
export const stop: DLightSvgTagFunc<SVGStopElement>
export const svg: DLightSvgTagFunc<SVGSVGElement & SVGPresentationAttrs>
export const switch_: DLightSvgTagFunc<SVGSwitchElement>
export const symbol: DLightSvgTagFunc<SVGSymbolElement>
export const text: DLightSvgTagFunc<SVGTextElement & SVGPresentationAttrs>
export const textPath: DLightSvgTagFunc<
  SVGTextPathElement & SVGPresentationAttrs
>
export const tspan: DLightSvgTagFunc<SVGTSpanElement>
// export const use: DLightSvgTagFunc<SVGUseElement>
export const view: DLightSvgTagFunc<SVGViewElement>
