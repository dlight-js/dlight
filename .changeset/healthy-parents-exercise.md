---
"@dlightjs/dlight": patch
---

Consumers of DLight can use ambient global types for html tags if they
choose. At the top of a `.view.ts` file (for example) add:

/// <reference types="@dlightjs/dlight/global" />

Then, use `div` or other html tags as desired, without having to import
them each individually for typescript.
