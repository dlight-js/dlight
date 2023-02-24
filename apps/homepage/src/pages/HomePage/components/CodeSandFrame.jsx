import {View} from "@dlightjs/dlight"

export class CodeSandBox extends View {
    src = 'https://codesandbox.io/p/sandbox/modern-waterfall-p56bwk?file=%2Fsrc%2FApp.jsx'
    Body = (
        <iframe
            src={this.src}
            style='width:60%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
            allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
            sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
        ></iframe>
    )
}
