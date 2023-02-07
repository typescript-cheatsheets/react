---
id: setup
title: Setup TypeScript with React
---

## Prerequisites

You can use this cheatsheet for reference at any skill level, but basic understanding of React and TypeScript is assumed. Here is a list of prerequisites:

- Good understanding of [React](https://reactjs.org).
- Familiarity with [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) and [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).
- Having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).
- Having read [the React section of the TypeScript playground](http://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=181#example/typescript-with-react).

This guide will always assume you are starting with the latest TypeScript and React versions. Notes for older versions will be in expandable `<details>` tags.

## VS Code Extensions

- Refactoring help https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit
- R+TS Code Snippets (there are a few...)
  - https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript
  - https://www.digitalocean.com/community/tutorials/the-best-react-extension-for-vs-code
- TypeScript official extension https://code.visualstudio.com/docs/languages/typescript
- JavaScript and TypeScript Nightly https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next

## React + TypeScript Starter Kits

Cloud setups:

- [TypeScript Playground with React](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUKJLHAN5wCuqWAyjMhhYANFx4BRAgSz44AXzhES5Snhi1GjLAA8W8XBAB2qeAGEInQ0KjjtycABsscALxwAFAEpXAPnaM4OANjeABtA0sYUR4Yc0iAXVcxPgEhdwAGT3oGAOTJaXx3L19-BkDAgBMIXE4QLCsAOhhgGCckgAMATQsgh2BcAGssCrgAEjYIqwVmutR27MC5LM0yuEoYTihDD1zAgB4K4AA3H13yvbAfbs5e-qGRiYspuBmsVD2Aekuz-YAjThgMCMcCMpj6gxcbGKLj8MTiVnck3gAGo4ABGTxyU6rcrlMF3OB1H5wT7-QFGbG4z6HE65ZYMOSMIA) just if you are debugging types (and reporting issues), not for running code
- [CodeSandbox](http://ts.react.new) - cloud IDE, boots up super fast
- [Stackblitz](https://stackblitz.com/edit/react-typescript-base) - cloud IDE, boots up super fast

Local dev setups:

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app@latest --ts` will create in your current folder
- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app name-of-app --template typescript` will create in new folder
- [Vite](https://vitejs.dev/): `npm create vite@latest my-react-ts-app -- --template react-ts`
- [Meteor](https://guide.meteor.com/build-tool.html#typescript): `meteor create --typescript name-of-my-new-typescript-app`
- [Ignite](https://github.com/infinitered/ignite#use-ignite-andross-infinite-red-andross-boilerplate) for React Native: `ignite new myapp`
- [TSDX](https://tsdx.io/): `npx tsdx create mylib` for Creating React+TS _libraries_. (in future: [TurboRepo](https://twitter.com/jaredpalmer/status/1346217789942591488))

<details>
<summary><b>Other tools</b></summary>

Less mature tools still worth checking out:

- [Snowpack](<https://www.snowpack.dev/#create-snowpack-app-(csa)>): `npx create-snowpack-app my-app --template app-template-react-typescript`
- [Docusaurus v2](https://v2.docusaurus.io/docs/installation) with [TypeScript Support](https://v2.docusaurus.io/docs/typescript-support)
- [Parcel](https://v2.parceljs.org/languages/typescript/)
- [JP Morgan's `modular`](https://github.com/jpmorganchase/modular): CRA + TS + Yarn Workspaces toolkit. `yarn create modular-react-app <project-name>`

Manual setup:

- [Basarat's guide](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) for **manual setup** of React + TypeScript + Webpack + Babel
- In particular, make sure that you have `@types/react` and `@types/react-dom` installed ([Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/))
- There are also many React + TypeScript boilerplates, please see [our Other Resources list](https://react-typescript-cheatsheet.netlify.app/docs/basic/recommended/resources/).

</details>

## Video Tutorial

Have a look at the 7-part "React Typescript Course" video series below for an introduction to TypeScript with React.

<a href="https://www.youtube.com/watch?v=PL1NUl7fQ2I&list=PLG-Mk4wQm9_LyKE5EwoZz2_GGXR-zJ5Ml">
    <img
        width="200px"
        alt="react typescript course video series"
        src="https://i.imgur.com/IIG0Xu9.jpeg"
    />
</a>
