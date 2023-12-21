import { createErrorHandler } from "@dlightjs/error-handler"

export const DLError = createErrorHandler(
  "ViewGenerator", {
    1: "Element prop in HTML should be a function or an identifier",
    2: "Unrecognized HTML common prop"
  }, {}, {}
)
