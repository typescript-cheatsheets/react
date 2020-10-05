---
id: setup
title: Setup TypeScript with React
---

## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful. If you’re an absolute beginner in TypeScript, check out [chibicode’s tutorial](https://ts.chibicode.com/todo/).)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).
4. having read [the React section of the new TypeScript playground](http://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=181#example/typescript-with-react) (optional: also step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section)

This guide will always assume you are starting with the latest TypeScript version. Notes for older versions will be in expandable `<details>` tags.

## React + TypeScript Starter Kits

Cloud setups:

- [TypeScript Playground with React](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUKJLHAN5wCuqWAyjMhhYANFx4BRAgSz44AXzhES5Snhi1GjLAA8W8XBAB2qeAGEInQ0KjjtycABsscALxwAFAEpXAPnaM4OANjeABtA0sYUR4Yc0iAXVcxPgEhdwAGT3oGAOTJaXx3L19-BkDAgBMIXE4QLCsAOhhgGCckgAMATQsgh2BcAGssCrgAEjYIqwVmutR27MC5LM0yuEoYTihDD1zAgB4K4AA3H13yvbAfbs5e-qGRiYspuBmsVD2Aekuz-YAjThgMCMcCMpj6gxcbGKLj8MTiVnck3gAGo4ABGTxyU6rcrlMF3OB1H5wT7-QFGbG4z6HE65ZYMOSMIA) just if you are debugging types (and reporting issues)
- [CodeSandbox](http://ts.react.new) - cloud IDE, boots up super fast
- [Stackblitz](https://stackblitz.com/edit/react-typescript-base) - same as CodeSandbox

Local dev setups:

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app -e with-typescript`
- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app my-app --template typescript`
- [Vite](https://twitter.com/swyx/status/1282727239230996480?lang=en): `npm init vite-app my-react-project --template react-ts` (note - not yet v1.0, but very fast)
- [Gatsby](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-typescript)
- [Parcel](https://v2.parceljs.org/languages/typescript/)

Manual setup: 

- [Basarat's guide](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) for **manual setup** of React + TypeScript + Webpack + Babel
- In particular, make sure that you have `@types/react` and `@types/react-dom` installed ([Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/))
- There are also many React + TypeScript boilerplates, please see [our Resources list below](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#recommended-react--typescript-codebases-to-learn-from).

## Import React

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
```

This is the [most futureproof way](https://www.reddit.com/r/reactjs/comments/iyehol/import_react_from_react_will_go_away_in_distant/) to import React. If you set `--allowSyntheticDefaultImports` (or add `"allowSyntheticDefaultImports": true`) in your `tsconfig.json` you can use more familiar imports:

```tsx
import React from "react";
import ReactDOM from "react-dom";
```

<details>

<summary>Explanation</summary>

Why `allowSyntheticDefaultImports` over `esModuleInterop`? [Daniel Rosenwasser](https://twitter.com/drosenwasser/status/1003097042653073408) has said that it's better for webpack/parcel. For more discussion check out <https://github.com/wmonk/create-react-app-typescript/issues/214>

You should also check [the new TypeScript docs for official descriptions between each compiler flag](https://www.typescriptlang.org/v2/en/tsconfig#allowSyntheticDefaultImports)!

</details>
