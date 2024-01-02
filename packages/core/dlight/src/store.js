export const DLStore = {
  global: window,
  document,
}

export function setGlobal(globalObj) {
  DLStore.global = globalObj
}

export function setDocument(customDocument) {
  DLStore.document = customDocument
}
