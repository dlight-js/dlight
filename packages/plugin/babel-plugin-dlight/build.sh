tsup \
    && sed -i '1iif(typeof process==="undefined")window.process={env:{}};' dist/index.js \
    && sed -i 's/"use strict";/"use strict";if(typeof process==="undefined")window.process={env:{}};/g' dist/index.cjs