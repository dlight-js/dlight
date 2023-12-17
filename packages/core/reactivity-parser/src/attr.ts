export const alteredAttrMap = {
  acceptCharset: "accept-charset",
  colSpan: "colspan",
  contentEditable: "contenteditable",
  formAction: "formaction",
  formEnctype: "formenctype",
  formMethod: "formmethod",
  formNoValidate: "formnovalidate",
  formTarget: "formtarget",
  httpEquiv: "http-equiv",
  intrinsicSize: "intrinsicsize",
  inputMode: "inputmode",
  itemProp: "itemprop",
  maxLength: "maxlength",
  minLength: "minlength",
  noValidate: "novalidate",
  playsInline: "playsinline",
  referrerPolicy: "referrerpolicy",
  rowSpan: "rowspan",
  tabIndex: "tabindex"
}

export function recoverHTMLAttrName(name: string): string {
  return alteredAttrMap[name as keyof typeof alteredAttrMap] || name
}
