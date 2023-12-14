import { ViewParser } from "./parser"
import { type ViewUnit, type ViewParserConfig, type ViewParserOption } from "./types"
import { type types as t } from "@babel/core"

/**
 * @brief Generate view units from a babel ast
 * @param view
 * @param config
 * @param options
 * @returns
 */
export function parseView(
  statement: t.BlockStatement,
  config: ViewParserConfig,
  options?: ViewParserOption
): ViewUnit[] {
  return new ViewParser(statement, config, options).viewUnits
}

export type * from "./types"
