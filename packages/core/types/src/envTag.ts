// ---- env
import { DLightObject } from "./compTag"

type AnyEnv = { _$anyEnv: true }

export function env<T = AnyEnv>(): T extends AnyEnv ? any : DLightObject<T> {
  return null as any
}
