import { type ViewUnit } from "@dlightjs/view-parser"
import { ReactivityParser } from "./parser"
import { type DLParticle, type ReactivityParserConfig, type ReactivityParserOption } from "./types"

export function parseReactivity(
  viewUnits: ViewUnit[],
  config: ReactivityParserConfig,
  options?: ReactivityParserOption
): [DLParticle[], Set<string>] {
  const usedProperties = new Set<string>()
  const dlParticles = viewUnits.map(viewUnit => {
    const parser = new ReactivityParser(viewUnit, config, options)
    const dlParticle = parser.parse()
    parser.usedProperties.forEach(usedProperties.add.bind(usedProperties))
    return dlParticle
  })
  return [dlParticles, usedProperties]
}
