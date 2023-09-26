import { renderToString } from "@dlightjs/dlight-server"
import APP from "./test.view"

export function render() {
  return renderToString(APP)
}
