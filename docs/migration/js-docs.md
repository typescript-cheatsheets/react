---
id: js_docs
title: JSDoc
---

- https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript
- webpack's codebase uses JSDoc with linting by TS https://twitter.com/TheLarkInn/status/984479953927327744 (some crazy hack: https://twitter.com/thelarkinn/status/996475530944823296)
- JSDoc can type check if using closure-compiler https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System

Problems to be aware of:

- `object` is converted to `any` for some reason.
- If you have an error in the jsdoc, you get no warning/error. TS just silently doesn't type annotate the function.
- [casting can be verbose](https://twitter.com/bahmutov/status/1089229349637754880)

(_thanks [Gil Tayar](https://twitter.com/giltayar/status/1089228919260221441) and [Gleb Bahmutov](https://twitter.com/bahmutov/status/1089229196247908353) for sharing above commentary_)
