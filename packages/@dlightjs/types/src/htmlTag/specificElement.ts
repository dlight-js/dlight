import { type DLightHtmlTag } from "."
import { type DLightHTMLElement } from "./htmlElement"

export interface DLightHtmlASpecific extends DLightHtmlTag<
DLightHtmlAreaSpecific,
DLightHTMLElement<DLightHtmlAreaSpecific, HTMLLinkElement>
> {}

export interface DLightHtmlAreaSpecific extends DLightHtmlTag<
DLightHtmlAreaSpecific,
DLightHTMLElement<DLightHtmlAreaSpecific, HTMLAreaElement>
> {}

export interface DLightHtmlAudioSpecific extends DLightHtmlTag<
DLightHtmlAudioSpecific,
DLightHTMLElement<DLightHtmlAudioSpecific, HTMLAudioElement>
> {}

export interface DLightHtmlDivSpecific extends DLightHtmlTag<
DLightHtmlDivSpecific,
DLightHTMLElement<DLightHtmlDivSpecific, HTMLDivElement>
> {}

export interface DLightHtmlImageSpecific extends DLightHtmlTag<
DLightHtmlImageSpecific,
DLightHTMLElement<DLightHtmlImageSpecific, HTMLImageElement>
> {}

export interface DLightHtmlBaseSpecific extends DLightHtmlTag<
DLightHtmlBaseSpecific,
DLightHTMLElement<DLightHtmlBaseSpecific, HTMLBaseElement>
> {}

export interface DLightHtmlBodySpecific extends DLightHtmlTag<
DLightHtmlBodySpecific,
DLightHTMLElement<DLightHtmlBodySpecific, HTMLBodyElement>
> {}

export interface DLightHtmlBRSpecific extends DLightHtmlTag<
DLightHtmlBRSpecific,
DLightHTMLElement<DLightHtmlBRSpecific, HTMLBRElement>
> {}

export interface DLightHtmlButtonSpecific extends DLightHtmlTag<
DLightHtmlButtonSpecific,
DLightHTMLElement<DLightHtmlButtonSpecific, HTMLButtonElement>
> {}

export interface DLightHtmlCanvasSpecific extends DLightHtmlTag<
DLightHtmlCanvasSpecific,
DLightHTMLElement<DLightHtmlCanvasSpecific, HTMLCanvasElement>
> {}

export interface DLightHtmlInputSpecific extends DLightHtmlTag<
DLightHtmlInputSpecific,
DLightHTMLElement<DLightHtmlInputSpecific, HTMLInputElement>
> {}

export interface DLightHtmlSpanSpecific extends DLightHtmlTag<
DLightHtmlSpanSpecific,
DLightHTMLElement<DLightHtmlSpanSpecific, HTMLSpanElement>
> {}

export interface DLightHtmlTableSpecific extends DLightHtmlTag<
DLightHtmlTableSpecific,
DLightHTMLElement<DLightHtmlTableSpecific, HTMLTableElement>
> {}

export interface DLightHtmlTextAreaSpecific extends DLightHtmlTag<
DLightHtmlTextAreaSpecific,
DLightHTMLElement<DLightHtmlTextAreaSpecific, HTMLTextAreaElement>
> {}

export interface DLightHtmlSelectSpecific extends DLightHtmlTag<
DLightHtmlSelectSpecific,
DLightHTMLElement<DLightHtmlSelectSpecific, HTMLSelectElement>
> {}
