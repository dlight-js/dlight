import { ViewParser } from "./parser"
import { type ViewUnit, type ViewParserConfig, type ViewParserOption } from "./types"
import { type types as t } from "@babel/core"

/**
 * @brief Generate view units from a babel ast
 * @param statement
 * @param config
 * @param options
 * @returns ViewUnit[]
 */
export function parseView(
  statement: t.BlockStatement,
  config: ViewParserConfig,
  options?: ViewParserOption
): ViewUnit[] {
  return new ViewParser(config, options).parse(statement)
}

export type * from "./types"
