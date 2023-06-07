import { type DLightHtmlTag } from "."
import { type DLightHTMLElement, type HTMLElementWrapper } from "./htmlElement"

export interface DLightHtmlASpecific extends DLightHtmlTag<
DLightHtmlAreaSpecific,
DLightHTMLElement<DLightHtmlAreaSpecific, HTMLElementWrapper<HTMLLinkElement>>
> {}

export interface DLightHtmlAreaSpecific extends DLightHtmlTag<
DLightHtmlAreaSpecific,
DLightHTMLElement<DLightHtmlAreaSpecific, HTMLElementWrapper<HTMLAreaElement>>
> {}

export interface DLightHtmlAudioSpecific extends DLightHtmlTag<
DLightHtmlAudioSpecific,
DLightHTMLElement<DLightHtmlAudioSpecific, HTMLElementWrapper<HTMLAudioElement>>
> {}

export interface DLightHtmlDivSpecific extends DLightHtmlTag<
DLightHtmlDivSpecific,
DLightHTMLElement<DLightHtmlDivSpecific, HTMLElementWrapper<HTMLDivElement>>
> {}

export interface DLightHtmlImageSpecific extends DLightHtmlTag<
DLightHtmlImageSpecific,
DLightHTMLElement<DLightHtmlImageSpecific, HTMLElementWrapper<HTMLImageElement>>
> {}

export interface DLightHtmlBaseSpecific extends DLightHtmlTag<
DLightHtmlBaseSpecific,
DLightHTMLElement<DLightHtmlBaseSpecific, HTMLElementWrapper<HTMLBaseElement>>
> {}

export interface DLightHtmlBodySpecific extends DLightHtmlTag<
DLightHtmlBodySpecific,
DLightHTMLElement<DLightHtmlBodySpecific, HTMLElementWrapper<HTMLBodyElement>>
> {}

export interface DLightHtmlBRSpecific extends DLightHtmlTag<
DLightHtmlBRSpecific,
DLightHTMLElement<DLightHtmlBRSpecific, HTMLElementWrapper<HTMLBRElement>>
> {}

export interface DLightHtmlButtonSpecific extends DLightHtmlTag<
DLightHtmlButtonSpecific,
DLightHTMLElement<DLightHtmlButtonSpecific, HTMLElementWrapper<HTMLButtonElement>>
> {}

export interface DLightHtmlCanvasSpecific extends DLightHtmlTag<
DLightHtmlCanvasSpecific,
DLightHTMLElement<DLightHtmlCanvasSpecific, HTMLElementWrapper<HTMLCanvasElement>>
> {}

export interface DLightHtmlInputSpecific extends DLightHtmlTag<
DLightHtmlInputSpecific,
DLightHTMLElement<DLightHtmlInputSpecific, HTMLElementWrapper<HTMLInputElement>>
> {}

export interface DLightHtmlSpanSpecific extends DLightHtmlTag<
DLightHtmlSpanSpecific,
DLightHTMLElement<DLightHtmlSpanSpecific, HTMLElementWrapper<HTMLSpanElement>>
> {}

export interface DLightHtmlTableSpecific extends DLightHtmlTag<
DLightHtmlTableSpecific,
DLightHTMLElement<DLightHtmlTableSpecific, HTMLElementWrapper<HTMLTableElement>>
> {}

export interface DLightHtmlTextAreaSpecific extends DLightHtmlTag<
DLightHtmlTextAreaSpecific,
DLightHTMLElement<DLightHtmlTextAreaSpecific, HTMLElementWrapper<HTMLTextAreaElement>>
> {}

export interface DLightHtmlSelectSpecific extends DLightHtmlTag<
DLightHtmlSelectSpecific,
DLightHTMLElement<DLightHtmlSelectSpecific, HTMLElementWrapper<HTMLSelectElement>>
> {}
