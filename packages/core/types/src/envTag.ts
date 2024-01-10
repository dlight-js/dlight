// ---- env
import { DLightObject } from "./customTag"

type AnyEnv = { _$anyEnv: true }

export function env<T = AnyEnv>(): T extends AnyEnv ? any : DLightObject<T> {
  return null as any
}
