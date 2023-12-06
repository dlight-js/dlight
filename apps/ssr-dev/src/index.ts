import { renderToString } from "@dlightjs/dlight-server"
import APP from "./views/test.view"

export function render() {
  return renderToString(APP)
}
