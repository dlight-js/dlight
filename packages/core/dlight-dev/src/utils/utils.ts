export function randomString() {
  return Math.random().toString(36).substring(2, 10)
}

export function geneId() {
  return `${this._$compName}-${randomString()}`
}
