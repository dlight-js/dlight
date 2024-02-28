import { createErrorHandler } from "@dlightjs/error-handler"

export const DLError = createErrorHandler(
  "ViewParser",
  {
    1: "Invalid syntax in DLight's View, only accepts dot chain call expression",
    2: "First argument of $0() must be an expression",
    3: "Invalid syntax in DLight's View, only accepts expression as props",
    4: "Invalid Snippet calling, only accepts static snippet calling like `this.Snippet()`",
  },
  {
    1: "DLight only accepts ForOfStatement as for loop, skipping this statement",
    2: "EnvUnit must have at least one child, skipping this statement",
    3: "Only Env/Comp/HTMLUnit can have a statement block as its children, skipping this statement",
    4: "If you want to use a key in a for loop, make the first statement as a label statement like `key: item`, skipping this key for now",
    5: "ForUnit must have at least one child, skipping this statement",
  },
  {
    1: "EnvUnit must have at least one prop, skipping this statement and flattening its children",
  }
)
