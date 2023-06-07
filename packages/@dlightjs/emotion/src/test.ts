import { styled } from "./index"
import { htmlTag, tag, type Typed, type Prop, type RequiredProp, type PropWrapper } from "@dlightjs/types"



type TT = Typed<PropWrapper<{ not: string, bbfuck?: string }>>
type NN = Typed<PropWrapper<{ ye: string, okk?: string }>>

type CC = TT & NN
let aa: TT = "" as any

const A = styled(aa) <{ aa: string, bb?: string }>`
    ${({ aa }) => aa}
`

