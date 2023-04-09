const AllSetableProperties = `className: string;
id: string;
onfullscreenchange: ((this: Element, ev: Event) => any) | null;
onfullscreenerror: ((this: Element, ev: Event) => any) | null;
outerHTML: string;
scrollLeft: number;
scrollTop: number;
slot: string;`

let out = AllSetableProperties.replace(/(.+?): (.+?);/g, "$1: (value: $2) => DlightHtmlTag;")
out = out.replace(/\n/g, "\n\t")
console.log("export interface DLightProperties {")
console.log("\t" + out)
console.log("}")
export {}