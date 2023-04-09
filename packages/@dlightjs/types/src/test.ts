import { Types } from "./customTag"
import { area, div, img } from "./htmlTag"

const View = undefined as any

let _ = document.getElementById("j")

interface SubViewProps {
    /**
     * @ok fuck me
     */
    hh?: string
    haha: number
    fuck: string
}


let a: SubViewProps = null as any

class MyComp extends View implements SubViewProps{
    hh: string = "ss"
    haha = 1
    fuck = "k"
    @Prop a = 1
    @KK ta = 1
    
    Body() {
        div("jjj")
            ._KhtmlBoxAlign()
            .className()
            .id()    
            .className()
        
            
            
        img()
            .src()
            .alt


            
            
            
        area()
            .coords()
            
            
            
            
            
        
            
            
    }
}

const SubViewView =  Types<SubViewProps>(MyComp)


let d = SubViewView()
.fuck('ss')
.haha(1)



class FuckView extends View {
    Body() {
        div("jjj")
        ._display('s')        

        
    
            // ._display("initial")
            // .didAppear(() => {})            

        SubViewView()
            
    }
}

